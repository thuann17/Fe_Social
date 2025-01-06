import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
    constructor() {
        this.stompClient = null;
        this.connected = false;
        this.subscriptions = {};
    }

    connect(endpoint = "http://localhost:8080/ws", onConnectCallback, onErrorCallback) {
        const socket = new SockJS(endpoint);
        this.stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("WebSocket connected");
                this.connected = true;
                if (onConnectCallback) onConnectCallback();
            },
            onStompError: (frame) => {
                console.error("STOMP error:", frame);
                if (onErrorCallback) onErrorCallback(frame);
            },
        });

        this.stompClient.activate();
    }

    disconnect() {
        if (this.stompClient) {
            this.stompClient.deactivate();
            console.log("WebSocket disconnected");
            this.connected = false;
        }
    }

    subscribe(destination, callback) {
        if (!this.connected || !this.stompClient) {
            console.error("WebSocket is not connected");
            return;
        }

        if (this.subscriptions[destination]) {
            console.warn(`Already subscribed to ${destination}`);
            return;
        }

        this.subscriptions[destination] = this.stompClient.subscribe(destination, (message) => {
            if (message.body) callback(JSON.parse(message.body));
        });
    }

    unsubscribe(destination) {
        if (this.subscriptions[destination]) {
            this.subscriptions[destination].unsubscribe();
            delete this.subscriptions[destination];
        }
    }

    send(destination, body) {
        if (this.connected && this.stompClient) {
            this.stompClient.publish({ destination, body: JSON.stringify(body) });
        } else {
            console.error("Cannot send message, WebSocket is not connected");
        }
    }

    isConnected() {
        return this.connected;
    }
}

export default new WebSocketService();
