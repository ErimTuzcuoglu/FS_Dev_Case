import WebSocket from 'ws';
import appConfig from '../../config/appConfig';
import Binance from '../../application/services/binance';
import subscriptionDbRepository from '../../application/repositories/subscriptionRepository';
import subscriptionDbRepositoryMongoDB from '../../loaders/database/mongoDB/repositories/subscriptionModelRepository';
import { subscriptions as subscriptionCases } from '../../application/use-cases';

const wss = new WebSocket.Server({ port: appConfig.socketPort });
const dbRepository = subscriptionDbRepository(subscriptionDbRepositoryMongoDB());

const connections = [];
const pairInterval = 30000;
const lastPairFetched = new Date();
let counter = 1;
let tradingPairs;

const subscribeToTicker = (pairs, ws) => pairs.forEach(pair => Binance.subscribeToTicker(pair, ws));

const getBinanceTradingPairs = (ws) => {
    return Binance.getTradingPairs()
        .then(pairs => {
            tradingPairs = pairs;
            ws.send(JSON.stringify({ type: 'tradingPairs', pairs }));
            subscribeToTicker(pairs, ws);
        })
        .catch(err => {
            ws.send(JSON.stringify({ type: 'error', message: 'Failed to fetch trading pairs' }))
        });
}

wss.on('connection', (ws, req) => {
    ws.send(JSON.stringify({ message: 'Connected to WebSocket Server' }));
    const userId = new URLSearchParams(req.url.split('?')[1])?.get('userId');
    connections.push(userId ? { userId, ws } : { userId: `guest-${counter++}`, ws });

    const now = new Date();
    if (((now - lastPairFetched) > pairInterval) || !tradingPairs) {
        getBinanceTradingPairs(ws);
    } else {
        ws.send(tradingPairs);
        subscribeToTicker(tradingPairs, ws);
    }

    ws.on('message', async (message) => {
        const { action, pair } = JSON.parse(message);

        if (action === 'subscribe') {
            await subscriptionCases.addSubscription(userId, pair, dbRepository);
        }

        if (action === 'unsubscribe') {
            await subscriptionCases.removeSubscription(userId, pair, dbRepository);
        }

        const pairs = await subscriptionCases.getSubscriptions(userId, dbRepository);
        ws.send(JSON.stringify({ userId, subscriptions: pairs }));
    });

    ws.on('close', () => {
        console.log('WebSocket closed');
        const index = connections.indexOf(ws);
        if (index !== -1) {
            connections.splice(index, 1);
        }
    });
});

console.log('WebSocket server running');
