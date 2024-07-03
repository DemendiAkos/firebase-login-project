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
        navigate('/signup')
    };

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        <button onClick={handleGoogleLogin}>Login with Google</button>
        <h3>Don't have an account?</h3>
        <button onClick={goSignUp}>Sign Up!</button>
      </div>
    );
  };
  
  export default Login;