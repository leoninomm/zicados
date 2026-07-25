import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCredential,
    signOut,
    GoogleAuthProvider,
    updateProfile,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
    authenticateUser,
    authenticateUserSuccess,
    authenticateUserFailed,
    setProfile,
    setProfileSuccess,
    setProfileFailed,
} from './authSlice';

import type { AppDispatch, RootState } from '../store';

export const signIn = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(authenticateUser());

    try {
        await signInWithEmailAndPassword(getAuth(), email, password);

        dispatch(authenticateUserSuccess());
    } catch (error) {
        console.log(error);
        dispatch(authenticateUserFailed((error as Error).message));
    }
};

export const createAccount = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(authenticateUser());

    try {
        await createUserWithEmailAndPassword(getAuth(), email, password);

        dispatch(authenticateUserSuccess());
    } catch (error) {
        console.log(error);
        dispatch(authenticateUserFailed((error as Error).message));
    }
};

export const googleSignIn = () => async (dispatch: AppDispatch) => {
    dispatch(authenticateUser());

    try {
        await GoogleSignin.hasPlayServices();

        const signInResult = await GoogleSignin.signIn();

        let idToken = signInResult.data?.idToken;
        if (!idToken) throw new Error('No id token found');

        const googleCredentials = GoogleAuthProvider.credential(idToken, idToken);
        await signInWithCredential(getAuth(), googleCredentials);
        dispatch(authenticateUserSuccess());
    } catch (error) {
        console.log(error);
        dispatch(authenticateUserFailed((error as Error).message));
    }
};

export const setUserProfile = (userName: string, photo: string) => async(dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setProfile());
    const state = getState();

    try {
        const auth = getAuth();
        if (auth.currentUser) {
            const profile = { displayName: userName, photoURL: photo };
            console.log(profile);
            await updateProfile(auth.currentUser, profile);
        }

        console.log('success');
        dispatch(setProfileSuccess({ userName, photo }));
    } catch (error) {
        console.log(error);
        dispatch(setProfileFailed((error as Error).message));
    }
};

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(authenticateUser());

    try {
        await signOut(getAuth());
    } catch (error) {
        console.log(error);
    }
};
