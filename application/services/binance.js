import Binance from 'binance-api-node'
import WebSocket from 'ws';
import appConfig from '../../config/appConfig';

async function getTradingPairs() {
    try {
        const client = Binance({
            apiKey: appConfig.key,
            apiSecret: appConfig.secret,
        });

        const exchangeInfo = await client.exchangeInfo()
        const activePairs = exchangeInfo.symbols.filter(pair => pair.status === 'TRADING')
        const first100Pairs = activePairs.slice(0, 100)
        const pairNames = first100Pairs.map(pair => pair.symbol)
        return pairNames
    } catch (error) {
        console.error('Error fetching trading pairs:', error)
        throw error;
    }
}

async function subscribeToTicker(pair, ws) {
    const socketUrl = `wss://stream.binance.com:9443/ws/${pair.toLowerCase()}@ticker`
    const socket = new WebSocket(socketUrl)

    socket.on('open', () => {
        console.log(`Subscribed to ${pair} ticker updates`)
    })

    socket.on('message', (data) => {
        const tickerData = JSON.parse(data)

        const priceData = {
            pair: pair,
            lastPrice: tickerData.c,
            change24h: tickerData.p,
            percentChange24h: tickerData.P,
        }

        ws.send(JSON.stringify({ type: 'tickerUpdate', data: priceData }))
    })

    socket.on('error', (error) => {
        console.error(`Error on WebSocket for ${pair}:`, error)
    })

    socket.on('close', () => {
        console.log(`Connection closed for ${pair}`)
    })
}


export default {
    getTradingPairs,
    subscribeToTicker
}