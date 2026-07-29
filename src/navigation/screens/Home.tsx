import { useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getOpenList } from '../../store/openList/openListThunk';
import { useTheme } from '../../hooks/useTheme';
import InnerScreenContainer from '../../components/ScreenContainers/InnerScreenContainer';
import TextField from '../../components/Textfield';
import Plus from '../../components/Icons/Plus';
import ListHeader from '../../components/ListStructure/ListHeader';
import ListTabs from '../../components/ListStructure/ListTabs';

import type { AppDispatch, RootState } from '../../store/store';
import { Theme } from '../../utils/theme';
import { Screens, Drawer } from '../../utils/types';

const Home = () => {
    const { loading, list, fetched } = useSelector((state: RootState) => state.openListReducer);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const theme = useTheme();

    useEffect(() => {
        if (!fetched) dispatch(getOpenList());
    }, [fetched]);

    const styles = Styles(theme);
    console.log(list);

    return (
        <InnerScreenContainer>
            {!loading && fetched && !list && (
                <View style={styles.content}>
                    <TextField>Nenhuma lista aberta</TextField>
                    <Pressable style={styles.button} onPress={() => navigation.navigate(Screens.Drawer, { screen: Drawer.CreateOpenList })}>
                        <Plus />
                        <TextField>Abrir lista</TextField>
                    </Pressable>
                </View>
            )}
            {list && (
                <View style={{ width: '100%', marginTop: 80 }}>
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
            )}
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
