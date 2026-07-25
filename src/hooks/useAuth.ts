import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export const useIsSignedIn = () => {
    const { user } = useSelector((state: RootState) => state.authReducer);

    return !!user;
};

export const useIsSignedOut = () => {
    const { user } = useSelector((state: RootState) => state.authReducer);

    return !!!user;
};

export const useIsProfileSet = () => {
    const { user } = useSelector((state: RootState) => state.authReducer);

    return !!user && !!!user?.displayName;
};
