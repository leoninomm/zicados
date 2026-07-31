import { View, StyleSheet } from 'react-native';
import { useIsOwner } from '../../hooks/usePlayers';
import TextField from '../Textfield';
import Accordion from '../Accordion';
import OwnerActions from './OwnerActions';
import Volleyball from '../Icons/Volleyball';
import Calendar from '../Icons/Calendar';
import Clock from '../Icons/Clock';
import LocationPin from '../Icons/LocationPin';
import Player from '../Icons/Player';
import { Theme } from '../../utils/theme';

type Props = {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    minPlayers: number;
    maxPlayers: number;
}

const ListHeader = ({
    title,
    date,
    startTime,
    endTime,
    location,
    minPlayers,
    maxPlayers,
}: Props) => {
    const isOwner = useIsOwner();

    const fixedHeader = (
        <View style={Styles.info}>
            <Volleyball />
            <TextField bold>{title}</TextField>
        </View>
    );

    return (
        <View>
            {isOwner && <OwnerActions />}
            <Accordion
                initialHeight={32}
                expandedHeight={164}
                title={fixedHeader}
                style={Styles.acoordion}
            >
                <View style={{ marginTop: 24, gap: 12 }}>
                    <View style={Styles.info}>
                        <Calendar />
                        <TextField>{date}</TextField>
                    </View>
                    <View style={Styles.info}>
                        <Clock />
                        <TextField>{startTime} às {endTime}</TextField>
                    </View>
                    <View style={Styles.info}>
                        <LocationPin />
                        <TextField>{location}</TextField>
                    </View>
                    <View style={Styles.info}>
                        <Player />
                        <TextField>{minPlayers.toString()} a {maxPlayers.toString()}</TextField>
                    </View>
                </View>
            </Accordion>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
    },
    acoordion: {
        width: '100%',
        backgroundColor: '#FCF9D9',
        borderWidth: 2,
        borderRadius: 32,
        borderColor: '#2F1805',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    info: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
});

export default ListHeader;
