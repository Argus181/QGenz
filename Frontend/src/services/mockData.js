// Mock data for development
const mockData = {
  stats: {
    totalUsers: 1250,
    totalResumes: 850,
    activeUsers: 450,
    totalQuestions: 2500,
    averageRating: 4.5
  },

  userGrowth: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [100, 150, 200, 250, 300, 350]
  },

  resumeUploads: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [50, 75, 100, 125, 150, 175]
  },

  recentActivity: [
    {
      id: 1,
      type: 'user_signup',
      user: 'John Doe',
      timestamp: '2024-03-15T10:30:00Z',
      details: 'New user registration'
    },
    {
      id: 2,
      type: 'resume_upload',
      user: 'Jane Smith',
      timestamp: '2024-03-15T09:15:00Z',
      details: 'Resume uploaded'
    },
    {
      id: 3,
      type: 'question_answered',
      user: 'Mike Johnson',
      timestamp: '2024-03-15T08:45:00Z',
      details: 'Answered 5 questions'
    }
  ],

  systemHealth: {
    status: 'healthy',
    uptime: '99.9%',
    responseTime: '120ms',
    activeConnections: 150,
    lastChecked: '2024-03-15T10:00:00Z'
  },

  users: {
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        status: 'active',
        joinDate: '2024-01-15',
        lastActive: '2024-03-15'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        status: 'active',
        joinDate: '2024-02-01',
        lastActive: '2024-03-15'
      }
    ],
    total: 1250,
    page: 1,
    limit: 10
  },

  resumes: {
    data: [
      {
        id: 1,
        userId: 1,
        title: 'Software Engineer Resume',
        uploadDate: '2024-03-01',
        status: 'active',
        views: 150
      },
      {
        id: 2,
        userId: 2,
        title: 'Product Manager Resume',
        uploadDate: '2024-03-10',
        status: 'active',
        views: 75
      }
    ],
    total: 850,
    page: 1,
    limit: 10
  }
};

export default mockData; 