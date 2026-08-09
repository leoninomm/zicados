import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createDrawerNavigator, createDrawerScreen } from '@react-navigation/drawer';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { useIsSignedIn, useIsSignedOut, useIsProfileSet } from '../hooks/useAuth';
import DrawerContent from '../components/DrawerContent';
import SignIn from './screens/SignIn';
import CreateAccount from './screens/CreateAccount';
import SetProfile from './screens/SetProfile';
import Home from './screens/Home';
import UpdateProfile from './screens/UpdateProfile';
import Players from './screens/Players';
import CreateOpenList from './screens/CreateOpenList';
import EditOpenList from './screens/EditOpenList';
import SelectPayer from './screens/SelectPayer';
import CreatePendingList from './screens/CreatePendingList';

const Drawer = createDrawerNavigator({
    drawerContent: (props) => <DrawerContent {...props} />,
    screenOptions: {
        drawerPosition: 'right',
        headerShown: false,
    },
    screens: {
        Home: {
            if: useIsSignedIn,
            screen: Home,
        },
        UpdateProfile: {
            if: useIsSignedIn,
            screen: UpdateProfile,
        },
        Players: {
            if: useIsSignedIn,
            screen: Players,
        },
        CreateOpenList: {
            if: useIsSignedIn,
            screen: CreateOpenList,
        },
        EditOpenList: {
            if: useIsSignedIn,
            screen: EditOpenList,
        },
        SelectPayer: {
            if: useIsSignedIn,
            screen: SelectPayer,
        },
        CreatePendingList: {
            if: useIsSignedIn,
            screen: CreatePendingList,
        }
    },
});

const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Drawer: {
            if: useIsSignedIn,
            screen: Drawer,
        },
        SignIn: {
            if: useIsSignedOut,
            screen: SignIn,
        },
        CreateAccount: {
            if: useIsSignedOut,
            screen: CreateAccount,
        },
        SetProfile: {
            if: useIsProfileSet,
            screen: SetProfile,
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
