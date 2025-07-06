import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, Trash2, X } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', email: '', password: '' });
  const [addLoading, setAddLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to fetch users' });
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/auth/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(u => u._id !== id));
      setToast({ type: 'success', message: 'User deleted' });
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to delete user' });
    }
    setDeletingId(null);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const res = await fetch('/api/auth/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Failed to add user');
      setShowAddModal(false);
      setAddForm({ name: '', email: '', password: '' });
      setToast({ type: 'success', message: 'User added' });
      fetchUsers();
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    }
    setAddLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users by search
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-indigo-900">Users</h1>
        <p className="text-indigo-700">Manage your users and their permissions</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-indigo-500" />
            <Input
              placeholder="Search users..."
              className="pl-8 border-indigo-300 focus:border-indigo-500 bg-white text-gray-900 placeholder:text-gray-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ minWidth: 220 }}
            />
          </div>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card className="shadow-lg border border-indigo-100">
        <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-t-lg">
          <CardTitle className="text-indigo-700">User List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No users found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b bg-indigo-100 text-indigo-800 text-left">Name</th>
                    <th className="py-2 px-4 border-b bg-indigo-100 text-indigo-800 text-left">Email</th>
                    <th className="py-2 px-4 border-b bg-indigo-100 text-indigo-800 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, idx) => (
                    <tr
                      key={u._id}
                      className={
                        `transition ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50`
                      }
                    >
                      <td className="py-2 px-4 border-b font-medium text-gray-900">{u.name}</td>
                      <td className="py-2 px-4 border-b text-gray-700">{u.email}</td>
                      <td className="py-2 px-4 border-b">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(u._id)}
                          disabled={deletingId === u._id}
                          title="Delete user"
                          className="hover:bg-red-100"
                        >
                          {deletingId === u._id ? (
                            <span className="animate-spin inline-block"><Trash2 className="h-4 w-4 opacity-50 text-red-500" /></span>
                          ) : (
                            <Trash2 className="h-4 w-4 text-red-500" />
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setShowAddModal(false)}
              title="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Add User</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                <Input
                  type="text"
                  value={addForm.name}
                  onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full border-indigo-200 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                <Input
                  type="email"
                  value={addForm.email}
                  onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))}
                  required
                  className="w-full border-indigo-200 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
                <Input
                  type="password"
                  value={addForm.password}
                  onChange={e => setAddForm(f => ({ ...f, password: e.target.value }))}
                  required
                  className="w-full border-indigo-200 focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" disabled={addLoading}>
                  {addLoading ? 'Adding...' : 'Add User'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white transition-all ${toast.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}
          onClick={() => setToast(null)}
          style={{ minWidth: 180, cursor: 'pointer', fontWeight: 500, letterSpacing: 0.5 }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
} 