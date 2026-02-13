import { useState, useRef, useEffect } from 'react';
import { generateContent } from '../../lib/genai';
import { Send, Mic, MicOff, LayoutDashboard, Trash2, User } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import { VectorStore } from '../../lib/memory';
import { Link } from 'react-router-dom';

interface ChatProps {
    autoSpeak: boolean;
}

function Chat({ autoSpeak }: ChatProps) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>(() => {
        const saved = localStorage.getItem('tom_chat_history');
        return saved ? JSON.parse(saved) : [
            { role: 'model', text: 'Welcome to your immersive Concierge. I have calibrated the interface for maximum tactile clarity and visual depth. How may I assist you today?' }
        ];
    });
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const {
        speak,
        cancel: cancelSpeech,
        isSpeaking,
        browserSupportsSpeechSynthesis
    } = useSpeechSynthesis();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        localStorage.setItem('tom_chat_history', JSON.stringify(messages));
    }, [messages, loading]);

    useEffect(() => {
        if (transcript) {
            setInput(transcript);
        }
    }, [transcript]);

    const handleSend = async (overrideMessage?: string) => {
        const messageToSend = overrideMessage || input;
        if (!messageToSend.trim() || loading) return;

        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
        setLoading(true);

        if (isSpeaking) cancelSpeech();

        try {
            // 1. Retrieve relevant memories
            const context = await VectorStore.findRelevant(messageToSend);

            // 2. Generate content with memory
            const response = await generateContent(messageToSend, context);

            setMessages(prev => [...prev, { role: 'model', text: response }]);

            // 3. Save to memory in background
            VectorStore.addMessage('user', messageToSend);
            VectorStore.addMessage('model', response);

            if (autoSpeak && browserSupportsSpeechSynthesis) {
                speak(response);
            }
        } catch (error: any) {
            const errorText = error.message || "I encountered an error processing your request.";
            setMessages(prev => [...prev, { role: 'model', text: errorText }]);
            if (autoSpeak && browserSupportsSpeechSynthesis) {
                speak(errorText);
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const clearChat = () => {
        const welcomeMessage = { role: 'model' as const, text: 'Welcome to your immersive Concierge. I have calibrated the interface for maximum tactile clarity and visual depth. How may I assist you today?' };
        setMessages([welcomeMessage]);
        localStorage.setItem('tom_chat_history', JSON.stringify([welcomeMessage]));
    };

    return (
        <div className="flex-1 flex flex-col h-full max-w-5xl mx-auto w-full px-6">
            {/* Immersive Scroll Area */}
            <main className="flex-1 no-scrollbar overflow-y-auto flex flex-col gap-8 py-12">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-6 w-full ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-4 duration-500`} style={{ animationDelay: `${idx * 0.05}s` }}>
                        {/* Avatar / Icon */}
                        <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${msg.role === 'model' ? 'bg-white glass-orb scale-110' : 'bg-slate-900 shadow-slate-200'}`}>
                            {msg.role === 'model' ? '👧' : <User className="w-6 h-6 text-white" />}
                        </div>

                        {/* Message bubble */}
                        <div className={`max-w-[80%] p-8 rounded-[2.5rem] shadow-2xl transition-all ${msg.role === 'user'
                            ? 'bg-slate-900 text-white rounded-tr-none shadow-slate-200'
                            : 'bg-white/80 backdrop-blur-xl text-slate-800 rounded-tl-none border border-white/40 shadow-slate-100'
                            }`}>
                            <p className="text-xl leading-relaxed font-semibold tracking-tight">
                                {msg.text}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Dashboard Shortcut prompt after Aurora speaks */}
                {!loading && messages[messages.length - 1]?.role === 'model' && (
                    <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                        <Link
                            to="/dashboard"
                            className="glass-orb px-8 py-4 rounded-3xl flex items-center gap-4 label-premium text-indigo-600 border-none shadow-xl hover:scale-105"
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            Deep Biometric Analysis
                        </Link>
                    </div>
                )}

                {loading && (
                    <div className="flex items-center gap-4 ml-20 py-6">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/40 animate-bounce"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/40 animate-bounce [animation-delay:0.2s]"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/40 animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            {/* Tactile Footer Dock */}
            <footer className="shrink-0 pb-12 pt-6">
                <div className="glass-orb border-none rounded-full p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] focus-within:ring-2 ring-indigo-500/20">
                    <div className="flex items-center gap-2">
                        {browserSupportsSpeechRecognition && (
                            <button
                                onClick={toggleListening}
                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 text-white shadow-lg animate-pulse' : 'text-slate-400 hover:bg-slate-50'}`}
                                title={isListening ? "Stop Listening" : "Start Voice Input"}
                            >
                                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                            </button>
                        )}
                        <button
                            onClick={clearChat}
                            className="w-14 h-14 rounded-full flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all"
                            title="Reset Conversation"
                        >
                            <Trash2 className="w-6 h-6" />
                        </button>
                        <input
                            className="flex-1 bg-transparent border-none text-slate-800 text-xl px-4 focus:ring-0 placeholder:text-slate-200 font-bold outline-none"
                            placeholder={isListening ? "I'm listening..." : "How can I assist you today?"}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={loading || (!input.trim() && !isListening)}
                            className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-10"
                        >
                            <Send className="w-6 h-6 translate-x-0.5" />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Chat;
