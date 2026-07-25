import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { useIsSignedIn, useIsSignedOut, useIsProfileSet } from '../hooks/useAuth';
import SignIn from './screens/SignIn';
import CreateAccount from './screens/CreateAccount';
import SetProfile from './screens/SetProfile';
import Home from './screens/Home';

const RootStack = createNativeStackNavigator({
    screens: {
        SignIn: {
            if: useIsSignedOut,
            screen: SignIn,
            options: {
                headerShown: false,
            }
        },
        CreateAccount: {
            if: useIsSignedOut,
            screen: CreateAccount,
            options: {
                headerShown: false,
            }
        },
        SetProfile: {
            if: useIsProfileSet,
            screen: SetProfile,
            options: {
                headerShown: false,
            },
        },
        Home: {
            if: useIsSignedIn,
            screen: Home,
            options: {
                headerShown: false,
            }
        },
    },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
