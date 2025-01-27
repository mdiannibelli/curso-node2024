import { Server } from 'http';
import WebSocket, { WebSocketServer } from 'ws'

interface Options {
    server: Server;
    path?: string;
}

export class WebSocketService {
    private static __instance: WebSocketService;
    private wss: WebSocketServer;

    private constructor(options: Options) {
        const { server, path = '/ws' } = options;
        this.wss = new WebSocketServer({ server, path });
        this.start();
    }

    public get instance(): WebSocketService {
        if (!WebSocketService.__instance) {
            throw 'WebSocketService is not initialized';
        }
        return WebSocketService.__instance;
    }

    static initialize(options: Options) {
        const { server, path = '/ws' } = options;
        WebSocketService.__instance = new WebSocketService({ server, path });
    }

    public start() {
        this.wss.on('connection', (ws: WebSocket) => {
            console.log('Client connected');

            ws.on('close', () => {
                console.log('Client disconnected');
            })
        })
    }
}