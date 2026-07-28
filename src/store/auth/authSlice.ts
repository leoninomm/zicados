import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@react-native-firebase/auth';

export interface AuthState {
    loading: boolean;
    user: User | null;
    birthday: string;
    error: string;
};

const initialState: AuthState = {
    loading: false,
    user: null,
    birthday: '',
    error: '',
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        fetchAuth: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        authenticateUser: (state) => { state.loading = true },
        authenticateUserSuccess: (state) => {
            state.loading = false;
            state.error = '';
        },
        authenticateUserFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload;
        },
        setUserDetails: (state, action: PayloadAction<string>) => {
            state.birthday = action.payload;
        },
        setProfile: (state) => { state.loading = true },
        setProfileSuccess: (state, action: PayloadAction<{userName: string, photo: string}>) => {
            state.loading = false;
            if (state.user) {
                state.user = {
                    ...state.user,
                    displayName: action.payload.userName,
                    photoURL: action.payload.photo,
                };
            };
            state.error = '';
        },
        setProfileFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchAuth,
    authenticateUser,
    authenticateUserSuccess,
    authenticateUserFailed,
    setUserDetails,
    setProfile,
    setProfileSuccess,
    setProfileFailed,
} = authSlice.actions;

export default authSlice.reducer;
