import { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getOpenList } from '../../store/openList/openListThunk';
import { getPlayers } from '../../store/players/playersThunk';
import { useTheme } from '../../hooks/useTheme';
import { useHasReplied } from '../../hooks/usePlayers';
import OpenListProvider from '../../contexts/OpenListContext';
import InnerScreenContainer from '../../components/ScreenContainers/InnerScreenContainer';
import TextField from '../../components/Textfield';
import Plus from '../../components/Icons/Plus';
import AnswerList from '../../components/ReplyToList';
import ListHeader from '../../components/ListStructure/ListHeader';
import ListTabs from '../../components/ListStructure/ListTabs';
import SplashScreen from '../../components/SplashScreen';

import type { AppDispatch, RootState } from '../../store/store';
import { Theme } from '../../utils/theme';
import { Screens, Drawer } from '../../utils/types';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';

const Home = () => {
    const [initializing, setInitializing] = useState(true);
    const { loading, list, fetched } = useSelector((state: RootState) => state.openListReducer);
    const { players } = useSelector((state: RootState) => state.playersReducer);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const theme = useTheme();
    const hasReplied = useHasReplied();

    const isLoading = loading || !fetched || !players.length || initializing;

    useEffect(() => {
        if (!fetched) dispatch(getOpenList());
        if (!players.length) dispatch(getPlayers());

        setTimeout(() => setInitializing(false), 2000);
    }, [fetched, players]);

    const styles = Styles(theme);

    const openListButton = (
        <Pressable style={styles.button} onPress={() => navigation.navigate(Screens.Drawer, { screen: Drawer.CreateOpenList })}>
            <Plus />
            <TextField>Abrir lista</TextField>
        </Pressable>
    );

    if (isLoading) return <SplashScreen />;

    return (
        <InnerScreenContainer>
            {!loading && fetched && !list && <Empty text='Nenhuma lista aberta' margin={150} action={openListButton} />}
            {list && !hasReplied && <AnswerList />}
            {list && (
                <OpenListProvider>
                    <View style={{ width: '100%', marginTop: !hasReplied ? 30 : 80, flex: 1 }}>
                        <ListHeader
                            title={list.title}
                            date={list.date}
                            startTime={list.startTime}
                            endTime={list.endTime}
                            location={list.location}
                            minPlayers={list.minPlayers}
                            maxPlayers={list.maxPlayers}
                        />
                        <ListTabs />
                    </View>
                </OpenListProvider>
            )}
            {isLoading && <Loading />}
        </InnerScreenContainer>
    );
};

const Styles = (theme: Theme) => StyleSheet.create({
    content: {
        marginTop: -100,
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        paddingHorizontal: 32,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        borderWidth: 1.5,
        borderColor: theme.border,
        backgroundColor: theme.button,
        flexDirection: 'row',
        gap: 12,
        marginTop: 32,
    },
});

export default Home;
