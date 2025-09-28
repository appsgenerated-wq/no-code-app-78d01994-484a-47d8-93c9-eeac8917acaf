import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await onLogin(email, password);
      } else {
        await onSignup(name, email, password);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cg fill=\'%231f2937\' fill-opacity=\'0.4\'%3E%3Crect x=\'0\' y=\'0\' width=\'5\' height=\'5\'/_E3_C/g_E3_E3_C/svg_E3_E")'}}>
      <div className="w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Newton's Lunar Chickens</h1>
            <p className="text-gray-400 mt-2">Log your groundbreaking observations of poultry in space.</p>
        </div>
        
        <div className="flex border-b border-gray-700">
            <button onClick={() => setIsLogin(true)} className={`w-1/2 py-3 text-sm font-medium ${isLogin ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}>Log In</button>
            <button onClick={() => setIsLogin(false)} className={`w-1/2 py-3 text-sm font-medium ${!isLogin ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
                <div>
                    <label className="text-sm font-medium text-gray-400">Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full p-3 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
            )}
            <div>
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-400">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-colors">{isLogin ? 'Log In' : 'Create Account'}</button>
        </form>
        <div className="text-center">
           <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Access Admin Panel</a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
