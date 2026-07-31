import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCredential,
    GoogleAuthProvider,
    updateProfile,
} from '@react-native-firebase/auth';
import { getStorage, ref, putFile, getDownloadURL } from '@react-native-firebase/storage';
import { collection, doc, getFirestore, updateDoc, setDoc, getDoc } from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
    authenticateUser,
    authenticateUserSuccess,
    authenticateUserFailed,
    setProfile,
    setProfileSuccess,
    setProfileFailed,
    setUserDetails,
} from './authSlice';

import type { AppDispatch } from '../store';
import type { ProfilePayload, SetProfilePayload, UpdateProfilePayload } from '../../utils/types';

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

export const setUserProfile = (payload: SetProfilePayload) => async(dispatch: AppDispatch) => {
    dispatch(setProfile());

    try {
        const auth = getAuth();
        if (auth.currentUser) {
            //save to Auth
            const reference = ref(getStorage(), `${auth.currentUser.uid}/profile-picture.png`);
            await putFile(reference, payload.photoURL);
            const photoURL = await getDownloadURL(reference);
            const { displayName } = payload;

            await updateProfile(auth.currentUser, {displayName, photoURL});

            //create user in firestore
            const db = getFirestore();
            const { uid } = auth.currentUser;
            
            setDoc(doc(collection(db, 'users'), uid), {
                uid,
                displayName,
                photoURL,
                birthday: payload.birthday,
            });

            dispatch(setProfileSuccess({
                userName: displayName,
                photo: photoURL,
            }));
        } else {
            throw new Error('No user authenticated');
        };
    } catch (error) {
        dispatch(setProfileFailed((error as Error).message));
    };
};

export const updateUserProfile = (payload: UpdateProfilePayload, isFileLoaded: boolean) => async(dispatch: AppDispatch) => {
    dispatch(setProfile());

    try {
        const auth = getAuth();
        if (auth.currentUser) {
            //save to Auth
            const { profile } = payload;
            let photoUrl = profile.photoURL;
            if (profile.photoURL && isFileLoaded) {
                const reference = ref(getStorage(), `${auth.currentUser.uid}/profile-picture.png`);
                await putFile(reference, profile.photoURL);
                photoUrl = await getDownloadURL(reference);
            }

            const profilePayload: ProfilePayload = { displayName: profile.displayName, photoURL: photoUrl };
            if (!profilePayload.displayName) delete profilePayload.displayName;
            if (!photoUrl) delete profilePayload.photoURL;
            await updateProfile(auth.currentUser, profilePayload);

            //save to Users
            const db = getFirestore();
            const { uid } = auth.currentUser;

            updateDoc(doc(collection(db, 'users'), uid), {
                displayName: profile.displayName,
                photoURL: profile.photoURL,
                birthday: payload.birthday,
            });
            
            dispatch(setProfileSuccess({
                userName: auth.currentUser.displayName ?? '',
                photo: auth.currentUser.photoURL ?? '',
            }));
        } else {
            throw new Error('No user authenticated');
        };
    } catch (error) {
        console.log(error);
        dispatch(setProfileFailed((error as Error).message));
    }
};

export const getUserDetails = () => async (dispatch: AppDispatch) => {
    try {
        const auth = getAuth();
        if (auth.currentUser) {
            const db = getFirestore();
            const user: any = await getDoc(doc(collection(db, 'users'), auth.currentUser.uid));

            dispatch(setUserDetails(user._data.birthday));
        }
    } catch (error) {
        console.log(error);
    }
};
