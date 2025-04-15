import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('https://api.ashyo.fullstackdev.uz/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password }),
      });

      const data = await res.json();
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate('/dashboard');
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <>
       <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-8"
      style={{ backgroundImage: `url(background.jpg)` }}
    >
      <div className="w-full max-w-6xl bg-opacity-95  rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 leading-tight">
            Welcome to SkillSwap - Learn, Connect, and Grow!
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Unlock boundless knowledge with SkillSwap – Your gateway to skill exchange and personal growth. 
            Let’s build a brighter future together, one skill at a time.
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Login</h2>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              <span className="text-lg md:text-xl font-semibold text-purple-700">Skill Swap</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleLogin}
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center justify-center my-4">
            <span className="text-gray-400 text-sm">or continue with</span>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 border p-2 rounded-lg flex items-center justify-center hover:shadow-md bg-white">
              <img src="/googleicon.png" alt="Google" className="h-5" />
            </button>
            <button className="flex-1 border p-2 rounded-lg flex items-center justify-center hover:shadow-md bg-white">
              <img src="/facebook.png" alt="Facebook" className="h-5" />
            </button>
            <button className="flex-1 border p-2 rounded-lg flex items-center justify-center hover:shadow-md bg-white">
              <img src="/github.png" alt="GitHub" className="h-5" />
            </button>
          </div>

          <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-2">
            <a
              href="https://skill-swap.netlify.app/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600"
            >
              Terms & Conditions
            </a>
            <p>
              Don't have an account?{" "}
              <span
                className="text-purple-600 cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

