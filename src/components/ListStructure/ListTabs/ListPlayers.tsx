import { View, StyleSheet, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetPlayers } from '../../../hooks/usePlayers';
import { useModal } from '../../../hooks/useModal';
import ListContainer from '../ListContainer';
import ListRow from '../ListRow';
import TextField from '../../Textfield';
import SwitchReplyModal from '../../Modals/SwitchStatusModal';
import Avatar from '../../Avatar';
import Empty from '../../Empty';
import Switch from '../../Icons/Switch';

import type { RootState } from '../../../store/store';

type Props = {
    attending?: boolean;
};

const ListPlayers = ({ attending = false }: Props) => {
    const { user } = useSelector((state: RootState) => state.authReducer);
    const players = useGetPlayers(attending);
    const { isModalOpen, openModal, closeModal } = useModal();

    const isUser = (id: string) => id === user?.uid;

    if (!players.length) return <Empty text={`Nenhum jogador disse que ${attending ? 'vai' : 'não vai'} ainda.`} />

    return (
        <ListContainer>
            {players.map((player, i) => (
                <ListRow index={i} isLast={i === players.length - 1} key={player.uid}>
                    <View style={Styles.player}>
                        <Avatar size={44} photo={player.photoURL} />
                        <TextField>{player.displayName}</TextField>
                    </View>
                    {isUser(player.uid) && (
                        <Pressable onPress={openModal}>
                            <Switch />
                        </Pressable>
                    )}
                </ListRow>
            ))}
            <SwitchReplyModal isModalOpen={isModalOpen} closeModal={closeModal} currentReply={attending} />
        </ListContainer>
    );
};

const Styles = StyleSheet.create({
    player: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
});

export default ListPlayers;
