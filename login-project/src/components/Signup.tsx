import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful");
      setEmail('');
      setPassword('');
      navigate('/profile');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const goLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Signup
          </button>
        </form>
        <h3 className="text-center mt-6">Back to the login page</h3>
        <button
          onClick={goLogin}
          className="w-full mt-2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
