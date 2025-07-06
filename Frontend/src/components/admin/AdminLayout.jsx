import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  MessageSquare,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Content', href: '/admin/content', icon: FileText },
  { name: 'Support', href: '/admin/support', icon: MessageSquare },
  { name: 'Feedback', href: '/admin/feedback', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  console.log('AdminLayout - Current location:', location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex">
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-40 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="text-white hover:bg-white/20">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4 bg-white">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400",
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                  )}
                  tabIndex={0}
                  aria-label={item.name}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-6 w-6 flex-shrink-0 transition-colors duration-150",
                      isActive ? "text-white" : "text-gray-500 group-hover:text-indigo-600"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={cn(
        "hidden lg:fixed lg:inset-y-0 lg:flex flex-col transition-all duration-200",
        sidebarCollapsed ? "lg:w-20" : "lg:w-64"
      )}>
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white shadow-xl">
          <div className="flex h-16 items-center px-4 justify-between bg-gradient-to-r from-indigo-600 to-purple-600">
            <h1 className={cn("text-xl font-bold text-white transition-all", sidebarCollapsed && "opacity-0 w-0")}>Admin Panel</h1>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 text-white hover:bg-white/20"
              onClick={() => setSidebarCollapsed((c) => !c)}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4 bg-white">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400",
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                  )}
                  tabIndex={0}
                  aria-label={item.name}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-6 w-6 flex-shrink-0 transition-colors duration-150",
                      isActive ? "text-white" : "text-gray-500 group-hover:text-indigo-600"
                    )}
                  />
                  <span className={cn("transition-all", sidebarCollapsed && "opacity-0 w-0")}>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(sidebarCollapsed ? "lg:pl-20" : "lg:pl-64", "flex-1 flex flex-col min-h-screen bg-gray-50")}> 
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow-md lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="px-4 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <main className="flex-1 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
} 