import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const wsUrl = import.meta.env.VITE_WS_URL ?? 'http://localhost:8080/ws';

export function criarSocketClient() {
    return new Client({
        webSocketFactory: () => new SockJS(wsUrl),

        reconnectDelay: 5000,

        debug: (mensagem) => {
            if (import.meta.env.DEV) {
                console.log('[WebSocket]', mensagem);
            }
        },
    });
}