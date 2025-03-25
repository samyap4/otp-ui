import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

interface Message {
  recipient: string;
  body: string;
  sender: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch('https://edge.samyap.dev/api/get-otp-codes');
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        </div>
        
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="mb-2">
                <span className="text-sm text-gray-500">
                  To: {message.recipient}
                </span>
              </div>
              <p className="text-gray-800">{message.body}</p>
            </div>
          ))}
          
          {messages.length === 0 && (
            <p className="text-center text-gray-500">No messages found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;