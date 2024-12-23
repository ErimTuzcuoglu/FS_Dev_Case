# FS_Dev_Case Backend Case

This project is a Node.js application designed to work in both development and production environments using Docker. The application is built with modern JavaScript frameworks and has room for future improvements, including linting and bundling optimizations for production.
## Prerequisites

   - Node.js version 18 or higher: Make sure your Node.js version is compatible. You can verify your version with:

    node -v

   - Docker: Ensure Docker is installed and running on your system. This project uses Docker for both development and production environments.

## Getting Started
### Installation

1- Clone the repository:

    git clone https://github.com/ErimTuzcuoglu/FS_Dev_Case.git
    cd FS_Dev_Case

2- Install dependencies:

    yarn

## Running the Application
### Local Development

To run the application locally using Docker in development mode (Recommended):

    yarn docker:dev

Or with Node.js (You also need run run mongoDB before execute the below command):

    set NODE_ENV=development && yarn dev

### Production Mode

For running the application in production mode using Docker:

    yarn docker:production


### Docs 
#### Development
In Development, it redirects to /docs on default route (/).

    http://localhost:3000/docs/

#### Production
    http://localhost:5000/docs/


# WebSocket Usage

This project supports real-time data streaming using the WebSocket protocol. The WebSocket server allows users to subscribe to trading pairs and receive live updates about their prices and related information.

## Connecting to the WebSocket Server

The WebSocket server is accessible via the following URLs:

- **Development**: `ws://localhost:3746`
- **Production**: `ws://localhost:3746`

## WebSocket API

Once connected, clients can perform the following actions by sending messages in JSON format.

### Message Format

#### **Sample Message**
```json
{
  "action": "subscribe",
  "pair": "BTCUSDT"
}
```

### Supported Actions

1. **`subscribe`**: Subscribe to a trading pair to receive live updates.  
   - **Parameters**:
     - `pair` (string): The trading pair to subscribe to (e.g., `BTCUSDT`).
   - **Example**:
     ```json
     {
       "action": "subscribe",
       "pair": "BTCUSDT"
     }
     ```

2. **`unsubscribe`**: Unsubscribe from a trading pair.  
   - **Parameters**:
     - `pair` (string): The trading pair to unsubscribe from (e.g., `BTCUSDT`).
   - **Example**:
     ```json
     {
       "action": "unsubscribe",
       "pair": "BTCUSDT"
     }
     ```

3. **`getSubscriptions`**: Retrieve the list of currently subscribed trading pairs.  
   - **Example**:
     ```json
     {
       "action": "getSubscriptions"
     }
     ```

### Server Responses

The WebSocket server sends updates and confirmations in JSON format.

#### **Real-Time Price Update**
```json
{
  "pair": "BTCUSDT",
  "price": "27340.12"
}
```

#### **Subscription Confirmation**
```json
{
  "action": "subscribed",
  "pair": "BTCUSDT"
}
```

#### **Unsubscription Confirmation**
```json
{
  "action": "unsubscribed",
  "pair": "BTCUSDT"
}
```

#### **Current Subscriptions**
```json
{
  "action": "subscriptions",
  "pairs": ["BTCUSDT", "ETHUSDT"]
}
```

## Testing

To run tests:

    yarn test