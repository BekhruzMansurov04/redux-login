import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LucideSearch } from 'lucide-react';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.ashyo.fullstackdev.uz/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Foydalanuvchi olib kelinmadi!!", error);
      });
  }, []);

  const Users = users.filter(user =>
    user.fullname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 text-sm">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-700">Teachers</h1>
        <Link 
          to="/addTeacher" 
          className="bg-blue-500 text-white px-3 py-1.5 rounded-md shadow hover:bg-blue-600 text-xs">
          Add Teacher
        </Link>
      </div>

      <div className="relative mb-4">
        <div className="absolute top-2 right-3 text-gray-400">
          <LucideSearch size={16} />
        </div>
        <input 
          type="text" 
          className="w-full px-3 py-1.5 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
          placeholder="Search by name or email" 
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-500">Image</th>
              <th className="px-8 py-2 text-left text-gray-500">Fullname</th>
              <th className="px-4 py-2 text-left text-gray-500">Role</th>
              <th className="px-4 py-2 text-left text-gray-500">Email</th>
              <th className="px-4 py-2 text-left text-gray-500">Phone</th>
              <th className="px-4 py-2 text-left text-gray-500">Created</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  {user.image ? (
                    <img
                      src={`https://api.ashyo.fullstackdev.uz/${user.image}`}
                      alt={user.fullname}
                      className="w-10 h-10 object-cover rounded-full border-2 border-blue-500"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      N/A
                    </div>
                  )}
                </td>
                <td className="px-8 py-2 text-blue-600 hover:underline">
                  <Link to={`/user/${user.id}`}>{user.fullname}</Link>
                </td>
                <td className="px-4 py-2 text-gray-500">{user.role}</td>
                <td className="px-4 py-2 text-gray-500">{user.email}</td>
                <td className="px-4 py-2 text-gray-500">{user.phone_number}</td>
                <td className="px-4 py-2 text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
