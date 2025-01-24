import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 5000 });

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);

        const payload = JSON.stringify({
            type: 'custom-message',
            payload: data.toString()
        });

        //* Todos - incluyente
        //wss.clients.forEach((client) => {
        //    if (client.readyState === WebSocket.OPEN) {
        //        client.send(payload, { binary: false });
        //    }
        //})

        //* Todos - excluyente
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(payload, { binary: false });
            }
        })
        // ws.send(JSON.stringify(payload)); // return data to the client
    });

    ws.send('Hello from server');

    ws.on('close', () => {
        ws.close()
        console.log('Client disconnected');
    })
});

console.log(`Server running on port http://localhost:5000`);