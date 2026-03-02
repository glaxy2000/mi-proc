import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your Mi-Proc AI assistant. I can help you with RFQ creation, bidding, orders, or any questions about the platform. How can I assist you today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a helpful Mi-Proc platform assistant for a B2B procurement platform in Saudi Arabia. 
        
Context about Mi-Proc:
- It's a B2B procurement platform connecting buyers and suppliers
- Users can create RFQs (Request for Quotations) for goods and services
- Suppliers submit bids/quotes in response to RFQs
- Platform has escrow protection for secure payments
- Features include supplier ratings, order tracking, and document management
- Compliance with Saudi regulations (SAMA, ZATCA, SASO)

User question: ${userMessage}

Provide a helpful, concise response. If the question is about how to use a feature, provide step-by-step guidance. Keep responses under 150 words unless more detail is needed.`,
        add_context_from_internet: false
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      speakText(response);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    'How do I create an RFQ?',
    'How does escrow work?',
    'How to rate a supplier?',
    'What documents do I need?'
  ];

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-white" />
          </span>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col border-2 border-indigo-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Mi-Proc Assistant</h3>
                <p className="text-xs text-indigo-100">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
                  <Loader2 className="h-4 w-4 text-indigo-600 animate-spin" />
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-slate-500 text-center mb-3">Quick actions:</p>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputMessage(action);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="w-full text-left text-sm p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-indigo-600 hover:bg-indigo-700"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
              AI-powered support for Mi-Proc
            </p>
          </div>
        </Card>
      )}
    </>
  );
}