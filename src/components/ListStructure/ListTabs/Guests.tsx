import { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetGuests } from '../../../hooks/usePlayers';
import { useModal } from '../../../hooks/useModal';
import ListContainer from '../ListContainer';
import ListRow from '../ListRow';
import TextField from '../../Textfield';
import RemoveGuestModal from '../../Modals/RemoveGuestModal';
import Empty from '../../Empty';
import Remove from '../../Icons/Remove';

import type { RootState } from '../../../store/store';
import { ListGuest } from '../../../utils/types';

const Guests = () => {
    const [guestToRemove, setGuestToRemove] = useState<ListGuest>();
    const { user } = useSelector((state: RootState) => state.authReducer);
    const guests = useGetGuests();
    const { isModalOpen, openModal, closeModal } = useModal();

    const isUsersGuest = (id: string) => id === user?.uid;

    const handleRemoveGuest = (guest: ListGuest) => {
        setGuestToRemove(guest);
        openModal();
    };
    

    if (!guests.length) return <Empty text='Ninguém convidou ninguém ainda.' />;

    return (
        <ListContainer>
            {guests.map((guest, i) => (
                <ListRow index={i} isLast={i === guests.length - 1} key={i}>
                    <TextField>{guest?.guestTag}</TextField>
                    {isUsersGuest(guest.playerResponsible) && (
                        <Pressable onPress={() => handleRemoveGuest(guest)}>
                            <Remove />
                        </Pressable>
                    )}
                </ListRow>
            ))}
            <RemoveGuestModal isModalOpen={isModalOpen} closeModal={closeModal} guest={guestToRemove} />
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

export default Guests;
