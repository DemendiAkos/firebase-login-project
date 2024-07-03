import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      navigate('/profile');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Login successful");
      navigate('/profile');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const goSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Login with Google
        </button>
        <h3 className="text-center mt-6">Don't have an account?</h3>
        <button
          onClick={goSignUp}
          className="w-full mt-2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Sign Up!
        </button>
      </div>
    </div>
  );
};

export default Login;
