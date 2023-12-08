const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // Handle incoming messages
    try {
      // Message processing logic
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    } catch (error) {
      console.error('Error processing message:', error);
      // Optionally, send an error message to the client
      // ws.send(JSON.stringify({ error: 'Message processing error' }));
    }
  });

  ws.on('close', function () {
    // Handle client disconnect
    console.log('Client disconnected');
    // Additional cleanup or notification logic
  });

  ws.on('error', function (error) {
    // Handle WebSocket errors
    console.error('WebSocket error:', error);
    // Optionally, close the connection or perform other actions
    // ws.close();
  });
});
