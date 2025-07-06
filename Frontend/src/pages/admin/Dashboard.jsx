import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  UserPlus,
  FileText,
  MessageSquare,
  CheckCircle,
  User,
  Clock
} from 'lucide-react';
import adminService from '../../services/adminService';
import mockData from '../../services/mockData';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [userData, setUserData] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalResumes, setTotalResumes] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Fetching stats from /api/auth/stats...');
        const response = await fetch('/api/auth/stats');
        console.log('Stats response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Stats data received:', data);
        
        if (typeof data.totalResumesUploaded === 'number') {
          setTotalResumes(data.totalResumesUploaded);
          console.log('Set total resumes to:', data.totalResumesUploaded);
        } else {
          console.error('Invalid totalResumesUploaded value:', data.totalResumesUploaded);
          setTotalResumes(0);
        }
        
        if (typeof data.totalQuestionsGenerated === 'number') {
          setTotalQuestions(data.totalQuestionsGenerated);
          console.log('Set total questions to:', data.totalQuestionsGenerated);
        } else {
          console.error('Invalid totalQuestionsGenerated value:', data.totalQuestionsGenerated);
          setTotalQuestions(0);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
        setTotalResumes(0);
        setTotalQuestions(0);
      }
    };

    // Fetch total users count
    fetch('/api/auth/users/count')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('User count data:', data);
        if (typeof data.total === 'number') {
          setTotalUsers(data.total);
        } else {
          console.error('Invalid user count data:', data);
          setTotalUsers(0);
        }
      })
      .catch(err => {
        console.error('Error fetching user count:', err);
        setTotalUsers(0);
      });

    // Fetch stats
    fetchStats();

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch real data from backend
        const [statsRes, userGrowthRes, resumeUploadsRes, activityRes, healthRes] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getUserGrowth(timeRange),
          adminService.getResumeUploads(timeRange),
          adminService.getRecentActivity(),
          adminService.getSystemHealth()
        ]);

        setStats(statsRes);
        setUserData(userGrowthRes);
        setResumeData(resumeUploadsRes);
        setRecentActivity(activityRes);
        setSystemHealth(healthRes);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900">Dashboard</h1>
          <p className="mt-1 text-indigo-700 text-sm sm:text-base">Welcome to your admin dashboard</p>
        </div>
        <button
          className="mt-2 sm:mt-0 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="rounded-xl shadow-md p-5 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white hover:scale-105 transition-transform cursor-pointer focus-within:ring-2 focus-within:ring-indigo-300" tabIndex={0} aria-label="Total Users">
          <h3 className="text-base sm:text-lg font-semibold">Total Users</h3>
          <p className="text-2xl sm:text-3xl font-bold animate-fade-in">{totalUsers}</p>
        </div>
        <div className="rounded-xl shadow-md p-5 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:scale-105 transition-transform cursor-pointer focus-within:ring-2 focus-within:ring-purple-300" tabIndex={0} aria-label="Total Resumes">
          <h3 className="text-base sm:text-lg font-semibold">Total Resumes</h3>
          <p className="text-2xl sm:text-3xl font-bold animate-fade-in">{totalResumes}</p>
        </div>
        <div className="rounded-xl shadow-md p-5 bg-gradient-to-br from-pink-500 to-pink-600 text-white hover:scale-105 transition-transform cursor-pointer focus-within:ring-2 focus-within:ring-pink-300" tabIndex={0} aria-label="Active Users">
          <h3 className="text-base sm:text-lg font-semibold">Active Users</h3>
          <p className="text-2xl sm:text-3xl font-bold animate-fade-in">{stats?.activeUsers}</p>
        </div>
        <div className="rounded-xl shadow-md p-5 bg-gradient-to-br from-indigo-500 to-purple-500 text-white hover:scale-105 transition-transform cursor-pointer focus-within:ring-2 focus-within:ring-indigo-300" tabIndex={0} aria-label="Total Questions">
          <h3 className="text-base sm:text-lg font-semibold">Total Questions</h3>
          <p className="text-2xl sm:text-3xl font-bold animate-fade-in">{totalQuestions}</p>
        </div>
      </div>

      {/* Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <div className="rounded-xl shadow-md p-5 bg-white hover:shadow-xl transition-shadow cursor-pointer focus-within:ring-2 focus-within:ring-indigo-200" tabIndex={0} aria-label="User Growth Chart">
          <h3 className="text-base sm:text-lg font-semibold text-indigo-700 mb-4">User Growth</h3>
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={userData?.data.map((value, index) => ({
                  name: userData.labels[index],
                  value: value
                }))}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#818cf8"
                  fillOpacity={0.5}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl shadow-md p-5 bg-white hover:shadow-xl transition-shadow cursor-pointer focus-within:ring-2 focus-within:ring-purple-200" tabIndex={0} aria-label="Resume Uploads Chart">
          <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-4">Resume Uploads</h3>
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={resumeData?.data.map((value, index) => ({
                  name: resumeData.labels[index],
                  value: value
                }))}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  fill="#a78bfa"
                  fillOpacity={0.5}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl shadow-md p-5 mb-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <h3 className="text-base sm:text-lg font-semibold text-indigo-700 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No recent activity</p>
              <p className="text-sm mt-2">Activity will appear here as users interact with the system</p>
            </div>
          ) : (
            recentActivity.map((activity) => {
              const getActivityIcon = () => {
                switch (activity.type) {
                  case 'user_signup':
                    return <UserPlus className="h-5 w-5 text-green-500" />;
                  case 'resume_upload':
                    return <FileText className="h-5 w-5 text-blue-500" />;
                  case 'question_answered':
                    return <CheckCircle className="h-5 w-5 text-purple-500" />;
                  case 'support_message':
                    return <MessageSquare className="h-5 w-5 text-orange-500" />;
                  case 'profile_update':
                    return <User className="h-5 w-5 text-indigo-500" />;
                  default:
                    return <Clock className="h-5 w-5 text-gray-500" />;
                }
              };

              return (
                <div 
                  key={activity.id} 
                  className="flex items-start gap-4 p-4 bg-white/80 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-indigo-200" 
                  tabIndex={0} 
                  aria-label={`Activity by ${activity.user}`}
                >
                  <div className="mt-1">
                    {getActivityIcon()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 truncate">
                        {activity.user}
                        <span className="text-sm text-gray-500 ml-2">
                          {activity.email}
                        </span>
                      </p>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                    {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        {Object.entries(activity.metadata).map(([key, value]) => (
                          <span key={key} className="mr-4">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* System Health */}
      <div className="rounded-xl shadow-md p-5 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <h3 className="text-base sm:text-lg font-semibold text-indigo-700 mb-4">System Health</h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/80 rounded-lg">
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-medium text-indigo-700">{systemHealth?.status}</p>
          </div>
          <div className="p-4 bg-white/80 rounded-lg">
            <p className="text-sm text-gray-600">Uptime</p>
            <p className="font-medium text-purple-700">{systemHealth?.uptime}</p>
          </div>
          <div className="p-4 bg-white/80 rounded-lg">
            <p className="text-sm text-gray-600">Response Time</p>
            <p className="font-medium text-pink-700">{systemHealth?.responseTime}</p>
          </div>
          <div className="p-4 bg-white/80 rounded-lg">
            <p className="text-sm text-gray-600">Active Connections</p>
            <p className="font-medium text-indigo-700">{systemHealth?.activeConnections}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 