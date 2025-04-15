import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://api.ashyo.fullstackdev.uz/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate('/dashboard');
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-8"
      style={{ backgroundImage: `url(background.jpg)` }}
    >
      <div className="w-full max-w-6xl bg-opacity-95 rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 leading-tight">
            Join SkillSwap and start your learning journey!
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            SkillSwap helps you connect with others to learn and grow. Create your account to begin your path to success.
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Register</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <span
              className="text-purple-600 cursor-pointer hover:underline"
              onClick={() => navigate("/loginPage")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
