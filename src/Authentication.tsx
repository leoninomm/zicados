import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { fetchAuth } from './store/auth/authSlice';
import { Navigation } from './navigation';
import SplashScreen from './components/SplashScreen';

import type { AppDispatch } from './store/store';

const Authentication = () => {
    const [initializing, setInitializing] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    const handleAuthStateChanged = (user: any) => {
        console.log(user);
        dispatch(fetchAuth(user?._user));
        setInitializing(false)
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
        return subscriber;
    }, []);

    GoogleSignin.configure({ webClientId: '913133243168-p9iv5ms86ba0kkao5h3i4jc67ojavcoq.apps.googleusercontent.com' });

    if (initializing) return <SplashScreen />


    return (
        <Navigation />
    )
}

export default Authentication;
