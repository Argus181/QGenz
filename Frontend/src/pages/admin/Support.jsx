import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Mail,
  Clock,
  RefreshCw,
  Send,
  Reply,
  MessageSquare,
} from 'lucide-react';
import adminService from '../../services/adminService';

export default function Support() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getMessages();
      if (response.success) {
        setMessages(response.messages);
      } else {
        setError('Failed to fetch messages');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      const response = await adminService.updateMessageStatus(messageId, newStatus);
      if (response.success) {
        setMessages(messages.map(msg => 
          msg._id === messageId ? { ...msg, status: newStatus } : msg
        ));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReply = async (messageId) => {
    if (!replyText.trim()) return;

    try {
      const response = await adminService.addReply(messageId, replyText);
      if (response.success) {
        setMessages(messages.map(msg => 
          msg._id === messageId ? { ...msg, reply: replyText } : msg
        ));
        setReplyText('');
        setSelectedMessage(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-black flex items-center gap-2 tracking-tight">
            <MessageSquare className="h-8 w-8 text-blue-500 transition-transform duration-300 hover:scale-110" />
            Support Center
          </h1>
          <p className="text-black mt-2 animate-slide-up">View and manage all user support requests in one place</p>
        </div>
        <Button
          variant="outline"
          onClick={fetchMessages}
          disabled={isLoading}
          className="flex items-center gap-2 border-black text-black hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Messages
        </Button>
      </div>

      {/* Error Notification */}
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md flex items-center gap-2 animate-slide-in-right">
          <XCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Total Messages', value: messages.length, icon: <MessageSquare className="h-8 w-8 text-blue-500" /> },
          { title: 'Unresolved', value: messages.filter(m => m.status === 'unresolved').length, icon: <XCircle className="h-8 w-8 text-yellow-500" /> },
          { title: 'Resolved', value: messages.filter(m => m.status === 'resolved').length, icon: <CheckCircle2 className="h-8 w-8 text-green-500" /> },
        ].map((stat, idx) => (
          <Card
            key={stat.title}
            className="bg-white shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-black">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-black">{stat.value}</h3>
                </div>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="bg-white shadow-md animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-black" />
              <Input
                placeholder="Search by name, email, or message content..."
                className="pl-8 border-black focus:ring-2 focus:ring-blue-500 text-white placeholder-black transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-black" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-black border-black transition-all duration-200"
              >
                <option value="all">All Messages</option>
                <option value="unresolved">Unresolved</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : filteredMessages.length === 0 ? (
          <Card className="bg-white shadow-md animate-fade-in">
            <CardContent className="py-8">
              <div className="text-center text-black">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-black animate-pulse" />
                <p className="text-lg font-medium">No messages found</p>
                <p className="text-sm mt-2">Try adjusting your search or filter criteria</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message, idx) => (
            <Card
              key={message._id}
              className="bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-500 transition-transform duration-200 hover:scale-125" />
                        <h3 className="font-semibold text-black">{message.name}</h3>
                        <span className="text-sm text-black">
                          {message.email}
                        </span>
                      </div>
                      <p className="text-sm text-black bg-gray-100 p-3 rounded-md transition-colors duration-200">
                        {message.message}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-black">
                        <Clock className="h-4 w-4" />
                        {new Date(message.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStatusChange(
                          message._id,
                          message.status === 'resolved' ? 'unresolved' : 'resolved'
                        )}
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 transform hover:scale-105 transition-all duration-200 ${
                          message.status === 'resolved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {message.status === 'resolved' ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                        {message.status === 'resolved' ? 'Resolved' : 'Unresolved'}
                      </button>
                    </div>
                  </div>

                  {/* Reply Section */}
                  {message.reply ? (
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-200 animate-slide-up">
                      <h4 className="font-semibold mb-2 text-blue-900">Support Team's Response:</h4>
                      <p className="text-sm text-blue-700">{message.reply}</p>
                    </div>
                  ) : selectedMessage === message._id ? (
                    <div className="space-y-2 animate-scale-up">
                      <textarea
                        className="w-full p-3 border rounded-md text-black border-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        rows="3"
                        placeholder="Type your response to the user..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedMessage(null);
                            setReplyText('');
                          }}
                          className="border-black text-white hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleReply(message._id)}
                          disabled={!replyText.trim()}
                          className="bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105 transition-all duration-200"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Response
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedMessage(message._id)}
                      className="text-blue-600 hover:text-blue-700 transform hover:scale-105 transition-all duration-200"
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Respond to User
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}