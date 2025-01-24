import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef(null);

    // WebSocket connection management
    useEffect(() => {
        const connect = () => {
            ws.current = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/lobby/');

            ws.current.onopen = () => {
                console.log('WebSocket connected');
                setIsConnected(true);
            };

            ws.current.onmessage = (e) => {
                const data = JSON.parse(e.data);
                setMessages(prev => [...prev, data.message]);
            };

            ws.current.onclose = (e) => {
                console.log('WebSocket disconnected:', e.reason);
                setIsConnected(false);
                // Attempt reconnect after 3 seconds
                setTimeout(connect, 3000);
            };

            ws.current.onerror = (err) => {
                console.error('WebSocket error:', err);
                ws.current?.close();
            };
        };

        connect();

        // Cleanup on unmount
        return () => {
            if (ws.current?.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (!messageInput.trim()) return;

        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                message: messageInput,
                timestamp: new Date().toISOString()
            }));
            setMessageInput('');
        } else {
            console.error('Cannot send message - WebSocket not connected');
        }
    };

    return (
        <div className="chat-container">
            <h2>Chat Room {isConnected ? '✅' : '❌'}</h2>
            
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg}
                    </div>
                ))}
            </div>

            <div className="message-input">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    disabled={!isConnected}
                />
                <button 
                    onClick={sendMessage}
                    disabled={!isConnected || !messageInput.trim()}
                >
                    Send
                </button>
            </div>

            {!isConnected && (
                <div className="connection-status">
                    Connecting to chat server...
                </div>
            )}
        </div>
    );
};

export default Chat;