import { View, ScrollView, StyleSheet } from 'react-native';
import TextField from '../Textfield';
import Avatar from '../Avatar';

import { Player } from '../../utils/types';

type Props = {
    players: Player[];
}

const ListPlayers = ({ players }: Props) => {
    const isEven = (i: number) => i % 2 === 0;

    return (
        <View style={Styles.container}>
            <ScrollView style={Styles.scroll}>
                {players.map((player, i) => (
                    <View
                        key={player.uid}
                        style={[
                            Styles.line,
                            isEven(i) ? Styles.evenLine : Styles.oddLine,
                            (i === 0) && Styles.firstLine,
                            (i === players.length - 1) && Styles.lastLine, 
                        ]}>
                        <Avatar size={44} photo={player.photoURL} />
                        <TextField>{player.displayName}</TextField>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
        maxHeight: 400,
        borderWidth: 2,
        borderColor: '#2F1805',
        borderRadius: 32,
    },
    scroll: {
        borderRadius: 32,
    },
    line: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,

    },
    evenLine: {
        backgroundColor: '#FCF9D9',
    },
    oddLine: {
        backgroundColor: '#FAFBFB',
    },
    firstLine: {
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
    },
    lastLine: {
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    }
});

export default ListPlayers;
