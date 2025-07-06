import React from 'react';
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
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { LogOut } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call logout API endpoint
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Clear any auth-related state
      // You might want to use your auth context here if you have one
      // Example: setAuth(null);

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect to home page even if the API call fails
      navigate('/');
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-indigo-900">Settings</h1>
        <p className="text-indigo-700">Manage your website settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-white p-1 rounded-lg shadow-sm">
          <TabsTrigger value="general" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">General</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">Security</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">Notifications</TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="bg-white border-indigo-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo-900">General Settings</CardTitle>
              <CardDescription className="text-indigo-700">
                Manage your website's general settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name" className="text-gray-700">Site Name</Label>
                <Input id="site-name" defaultValue="My Website" className="border-indigo-200 focus:border-indigo-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description" className="text-gray-700">Site Description</Label>
                <Input id="site-description" defaultValue="A modern website built with React" className="border-indigo-200 focus:border-indigo-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-gray-700">Timezone</Label>
                <Input id="timezone" defaultValue="UTC" className="border-indigo-200 focus:border-indigo-500" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" className="data-[state=checked]:bg-indigo-600" />
                <Label htmlFor="maintenance-mode" className="text-gray-700">Maintenance Mode</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-white border-indigo-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo-900">Security Settings</CardTitle>
              <CardDescription className="text-indigo-700">
                Manage your website's security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="two-factor" className="data-[state=checked]:bg-indigo-600" />
                <Label htmlFor="two-factor" className="text-gray-700">Two-Factor Authentication</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="password-expiry" className="data-[state=checked]:bg-indigo-600" />
                <Label htmlFor="password-expiry" className="text-gray-700">Password Expiry</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout" className="text-gray-700">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" className="border-indigo-200 focus:border-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-white border-indigo-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo-900">Notification Settings</CardTitle>
              <CardDescription className="text-indigo-700">
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="email-notifications" className="data-[state=checked]:bg-indigo-600" />
                <Label htmlFor="email-notifications" className="text-gray-700">Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="push-notifications" className="data-[state=checked]:bg-indigo-600" />
                <Label htmlFor="push-notifications" className="text-gray-700">Push Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="marketing-emails" className="data-[state=checked]:bg-indigo-600" />
                <Label htmlFor="marketing-emails" className="text-gray-700">Marketing Emails</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Manage your third-party integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" defaultValue="sk_test_123456789" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="google-analytics" />
                <Label htmlFor="google-analytics">Google Analytics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="stripe" />
                <Label htmlFor="stripe">Stripe Integration</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center pt-6 border-t border-indigo-100">
        <Button 
          onClick={handleLogout}
          variant="outline" 
          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md">
          Save Changes
        </Button>
      </div>
    </div>
  );
} 