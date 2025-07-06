import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  FileText, 
  Users, 
  BookOpen, 
  Shield, 
  HelpCircle, 
  Briefcase, 
  Brain, 
  Newspaper,
  Filter,
  ChevronDown
} from 'lucide-react';

// Content categories
const CONTENT_CATEGORIES = {
  interviewQuestions: {
    title: 'Interview Questions',
    icon: <FileText className="h-5 w-5" />,
    subcategories: [
      'Technical Interview Questions',
      'Behavioral Interview Questions',
      'HR Interview Questions',
      'Industry-specific Questions',
      'Leadership & Management Questions'
    ]
  },
  userGuides: {
    title: 'User Guides',
    icon: <BookOpen className="h-5 w-5" />,
    subcategories: [
      'How to Generate Questions',
      'Resume Upload Guide',
      'Question Customization',
      'Export & Save Guide',
      'AI Features Guide'
    ]
  },
  hrResources: {
    title: 'HR Resources',
    icon: <Users className="h-5 w-5" />,
    subcategories: [
      'Interview Best Practices',
      'Evaluation Guidelines',
      'Assessment Templates',
      'Interview Scorecards',
      'Compliance Guidelines'
    ]
  },
  jobSeekerResources: {
    title: 'Job Seeker Resources',
    icon: <Briefcase className="h-5 w-5" />,
    subcategories: [
      'Interview Preparation',
      'Common Questions',
      'Behavioral Questions Guide',
      'Resume Writing Tips',
      'Career Development'
    ]
  },
  platformDocs: {
    title: 'Platform Documentation',
    icon: <FileText className="h-5 w-5" />,
    subcategories: [
      'Getting Started',
      'Feature Documentation',
      'API Documentation',
      'Pricing Plans',
      'FAQ'
    ]
  },
  legal: {
    title: 'Legal & Policy',
    icon: <Shield className="h-5 w-5" />,
    subcategories: [
      'Terms of Service',
      'Privacy Policy',
      'Data Usage Policy',
      'GDPR Compliance',
      'Cookie Policy'
    ]
  },
  support: {
    title: 'Support Content',
    icon: <HelpCircle className="h-5 w-5" />,
    subcategories: [
      'Troubleshooting Guides',
      'Contact Information',
      'Support System',
      'Knowledge Base',
      'Video Tutorials'
    ]
  },
  industry: {
    title: 'Industry Content',
    icon: <Briefcase className="h-5 w-5" />,
    subcategories: [
      'Tech Industry',
      'Healthcare Industry',
      'Finance Industry',
      'Marketing Industry',
      'Sales Industry'
    ]
  },
  aiTech: {
    title: 'AI & Technology',
    icon: <Brain className="h-5 w-5" />,
    subcategories: [
      'AI Technology Guide',
      'Question Generation',
      'Resume Parsing',
      'Data Security',
      'AI Ethics'
    ]
  },
  blog: {
    title: 'Blog & Updates',
    icon: <Newspaper className="h-5 w-5" />,
    subcategories: [
      'Platform Updates',
      'Feature Announcements',
      'Industry News',
      'Success Stories',
      'User Testimonials'
    ]
  }
};

export default function Content() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-indigo-900">Content Management</h1>
        <p className="text-indigo-700">Manage your website content and resources</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-indigo-500" />
            <Input
              placeholder="Search content..."
              className="pl-8 border-indigo-300 focus:border-indigo-500 bg-white text-gray-900 placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md">
          <Plus className="mr-2 h-4 w-4" />
          Add Content
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="p-4 bg-white/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </Card>
      )}

      {/* Content Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(CONTENT_CATEGORIES).map(([key, category]) => (
          <Card
            key={key}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedCategory === key ? 'ring-2 ring-indigo-500' : ''
            }`}
            onClick={() => setSelectedCategory(key)}
          >
            <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-t-lg">
              <div className="flex items-center gap-2">
                {category.icon}
                <CardTitle className="text-indigo-700">{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                {category.subcategories.map((subcategory, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 rounded hover:bg-indigo-50"
                  >
                    <span className="text-sm text-gray-700">{subcategory}</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4 text-indigo-600" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}