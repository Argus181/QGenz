import React, { useState, useEffect } from 'react';
import { MessageSquare, CheckCircle, XCircle, RefreshCw, Filter, Search, Star } from 'lucide-react';
import axios from 'axios';

const FeedbackList = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'reviewed'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'rating'
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const response = await axios.get('/api/feedback/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFeedback(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch feedback');
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setIsRefreshing(true);
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Authentication required');
        return;
      }

      await axios.put(`/api/feedback/${id}/status`, 
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      await fetchFeedback();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
      console.error('Error updating feedback status:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const filteredFeedback = feedback
    .filter(item => {
      const matchesFilter = filter === 'all' || item.status === filter;
      const matchesSearch = searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.message.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'rating':
          return b.rating - a.rating;
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const stats = {
    total: feedback.length,
    pending: feedback.filter(item => item.status === 'pending').length,
    reviewed: feedback.filter(item => item.status === 'reviewed').length,
    averageRating: feedback.length > 0
      ? (feedback.reduce((acc, item) => acc + item.rating, 0) / feedback.length).toFixed(1)
      : 0
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-indigo-500 dark:text-indigo-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-red-700 dark:text-red-400">
        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Feedback</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Reviewed</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.reviewed}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Rating</h3>
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.averageRating}</p>
            <Star className="h-5 w-5 text-yellow-400 dark:text-yellow-300 fill-current" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
        <button
          onClick={fetchFeedback}
          disabled={isRefreshing}
          className="flex items-center gap-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Feedback List */}
      {filteredFeedback.length === 0 ? (
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-8 text-center text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
          No feedback submissions found
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredFeedback.map((item) => (
            <div
              key={item._id}
              className="rounded-xl border bg-white dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-md border-gray-200 dark:border-gray-700"
            >
              <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.email}</p>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < item.rating
                            ? 'text-yellow-400 dark:text-yellow-300 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      item.status === 'reviewed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {item.status === 'reviewed' ? 'Reviewed' : 'Pending'}
                  </span>
                </div>
              </div>

              <p className="mb-4 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{item.message}</p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}
                </span>
                <div className="flex gap-2">
                  {item.status === 'pending' ? (
                    <button
                      onClick={() => updateStatus(item._id, 'reviewed')}
                      disabled={isRefreshing}
                      className="flex items-center gap-1 rounded-lg bg-green-50 dark:bg-green-900/30 px-3 py-2 text-sm font-medium text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Mark as Reviewed
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatus(item._id, 'pending')}
                      disabled={isRefreshing}
                      className="flex items-center gap-1 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 px-3 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="h-4 w-4" />
                      Mark as Pending
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList; 