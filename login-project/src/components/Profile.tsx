import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [username, SetUsername] = useState<any>(null);
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
            SetUsername(data.username || '');
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
                await setDoc(docRef, {username, age, weight, height }, { merge: true });
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
        <div>
            <h1>Welcome!</h1>
            <h1>{username}</h1>
            <form onSubmit={handleSave}>
                <div>
                    <label>Username:</label>
                    <input type="text" placeholder='Username' value={username} onChange={(e) => SetUsername(e.target.value)} />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                    <label>Weight:</label>
                    <input type="text" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div>
                    <label>Height:</label>
                    <input type="text" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
                <button type="submit">Save</button>
            </form>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    );
};

export default Profile;
