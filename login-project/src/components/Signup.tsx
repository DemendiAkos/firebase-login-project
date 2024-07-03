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
      } catch (error: any) {
        alert(error.message);
      }
    
    };
  
    const goLogin = () => {
        navigate('/login')
    };

    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Signup</button>
        </form>
        <h3>Back to the login page</h3>
        <button onClick={goLogin}>Login</button>
      </div>
    );
  };
  
export default Signup;


