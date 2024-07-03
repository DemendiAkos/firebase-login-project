import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserData = async (uid: string) => {
    console.log('Fetching user data...');
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('User data:', data);
      setUsername(data.username || '');
      setAge(data.age || '');
      setWeight(data.weight || '');
      setHeight(data.height || '');
    } else {
      console.log('No such document!');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile...');
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, { username, age, weight, height }, { merge: true });
        alert('Profile updated successfully');
      } catch (error: any) {
        console.error('Error updating profile:', error);
        alert('Error updating profile: ' + error.message);
      }
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error: any) {
      console.error('Error logging out:', error);
      alert('Error logging out:' + error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome, {username}!</h1>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-400">Username:</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400">Age:</label>
            <input
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400">Weight:</label>
            <input
              type="text"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400">Height:</label>
            <input
              type="text"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
        </form>
        <button
          onClick={handleLogOut}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
