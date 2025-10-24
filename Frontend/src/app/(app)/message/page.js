'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const MessagePage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        // Simular la carga de mensajes y chats desde una API
        const initialMessages = [
            { id: 1, text: "Hola, ¿cómo estás?", sender: "other", time: "10:30 AM" },
            { id: 2, text: "¡Muy bien! ¿Y tú?", sender: "me", time: "10:31 AM" },
            { id: 1, text: "Hola, ¿cómo estás?", sender: "other", time: "10:30 AM" },
            { id: 2, text: "¡Muy bien! ¿Y tú?", sender: "me", time: "10:31 AM" },
            { id: 1, text: "Hola, ¿cómo estás?", sender: "other", time: "10:30 AM" },
            { id: 2, text: "¡Muy bien! ¿Y tú?", sender: "me", time: "10:31 AM" },
            { id: 1, text: "Hola, ¿cómo estás?", sender: "other", time: "10:30 AM" },
            { id: 2, text: "¡Muy bien! ¿Y tú?", sender: "me", time: "10:31 AM" },
            { id: 1, text: "Hola, ¿cómo estás?", sender: "other", time: "10:30 AM" },
            { id: 2, text: "¡Muy bien! ¿Y tú?", sender: "me", time: "10:31 AM" },
            { id: 1, text: "Hola, ¿cómo estás?", sender: "other", time: "10:30 AM" },
            { id: 2, text: "¡Muy bien! ¿Y tú?", sender: "me", time: "10:31 AM" },
            { id: 1, text: "Hola, ¿cómo estás?", sender: "other", time: "10:30 AM" },
            { id: 2, text: "joa si siempre que te escribo no me respondes, porque no me quieres? o porque no me quieres?", sender: "me", time: "10:31 AM" },
            { id: 1, text: "Hola, ¿cómo estás?", sender: "other", time: "10:30 AM" },
            { id: 2, text: "¡Muy bien! ¿Y tú?", sender: "me", time: "10:31 AM" },
        ];
        setMessages(initialMessages);

        const initialChats = [
            { id: 1, name: "Juan Pérez", lastMessage: "Hola, ¿cómo estás?" },
            { id: 2, name: "María García", lastMessage: "¿Nos vemos mañana?" },
            { id: 3, name: "Carlos López", lastMessage: "Gracias por la información" },
        ];
        setChats(initialChats);

        // Desplazar el scroll hacia abajo al cargar la página
        const messageContainer = document.querySelector('.flex-1.overflow-y-auto');
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }, []);

    useEffect(() => {
        // Desplazar el scroll hacia abajo al cargar nuevos mensajes
        const messageContainer = document.querySelector('.flex-1.overflow-y-auto');
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        const newMessage = {
            id: messages.length + 1,
            text: message,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setMessage('');
    };

    return (
        <div className="fixed w-[84%] ml-[15%] h-[90%] mt-[5%] inset-0 flex bg-gray-100">
            {/* Lista de chats (izquierda) */}
            <div className="w-1/4 bg-white border-r overflow-y-auto">
                {chats.map((chat) => (
                    <div key={chat.id} className="p-4 border-b hover:bg-gray-100 cursor-pointer">
                        <h3 className="font-semibold">{chat.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                ))}
            </div>

            {/* Área de conversación (derecha) */}
            <div className="flex-1 flex flex-col">
                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}>
                            <div className={`${msg.sender === 'me' ? 'bg-blue-100' : 'bg-white'} rounded-lg shadow p-3 max-w-[70%] inline-block`}>
                                <p className="text-gray-700">{msg.text}</p>
                                <span className="text-xs text-gray-500 block text-right">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Formulario de entrada (fijo en la parte inferior) */}
                <form onSubmit={handleSendMessage} className="bg-white p-4 flex items-center border-t">
                    <button type="button" className="text-gray-500 hover:text-gray-700 mr-2">
                        <FontAwesomeIcon icon={faPaperclip} className="w-5 h-5" />
                    </button>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button type="submit" className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600">
                        <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessagePage;