import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCredential,
    signOut,
    GoogleAuthProvider,
    updateProfile,
} from '@react-native-firebase/auth';
import { getStorage, ref, putFile, getDownloadURL } from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
    authenticateUser,
    authenticateUserSuccess,
    authenticateUserFailed,
    setProfile,
    setProfileSuccess,
    setProfileFailed,
} from './authSlice';

import type { AppDispatch } from '../store';
import type { ProfilePayload } from '../../utils/types';

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

export const setUserProfile = (payload: ProfilePayload, isFileLoaded: boolean) => async(dispatch: AppDispatch) => {
    dispatch(setProfile());

    try {
        const auth = getAuth();
        if (auth.currentUser) {
            let photoUrl = payload.photoURL;
            if (payload.photoURL && isFileLoaded) {
                const reference = ref(getStorage(), `${auth.currentUser.uid}/profile-picture.png`);
                await putFile(reference, payload.photoURL);
                photoUrl = await getDownloadURL(reference);
            }

            const profile: ProfilePayload = { displayName: payload.displayName, photoURL: photoUrl };
            if (!payload.displayName) delete profile.displayName;
            if (!photoUrl) delete profile.photoURL;
            console.log(profile);
            await updateProfile(auth.currentUser, profile);
            
            console.log('success');
            dispatch(setProfileSuccess({
                userName: auth.currentUser.displayName ?? '',
                photo: auth.currentUser.photoURL ?? '',
            }));
        }
    } catch (error) {
        console.log(error);
        dispatch(setProfileFailed((error as Error).message));
    }
};
