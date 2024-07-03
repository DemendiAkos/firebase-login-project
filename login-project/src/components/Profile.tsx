import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null);
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
                await setDoc(docRef, { age, weight, height }, { merge: true });
                alert('Profile updated successfully');
            } catch (error: any) {
                console.error('Error updating profile:', error);
                alert('Error updating profile: ' + error.message);
            }
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            <form onSubmit={handleSave}>
                <input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                <input type="text" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <input type="text" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default Profile;
