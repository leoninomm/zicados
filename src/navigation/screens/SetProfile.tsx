import { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../../store/auth/authThunk';
import { useTheme } from '../../hooks/useTheme';
import OuterScreenContainer from '../../components/ScreenContainers/OuterScreenContainer';
import TextField from '../../components/Textfield';
import ProfileSettings from '../../components/ProfileSettings';

import type { Theme } from '../../utils/theme';
import type { AppDispatch, RootState } from '../../store/store';

const SetProfile = () => {
    const [userName, setUserName] = useState('');
    const [photo, setPhoto] = useState('');

    const { loading } = useSelector((state: RootState) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();
    const styles = Styles(theme);

    const updateProfile = () => {
        if (!userName || !photo) return;
        dispatch(setUserProfile({ displayName: userName, photoURL: photo }, true));
    };

    return (
        <OuterScreenContainer loading={loading}>
            <ProfileSettings
                displayName={userName}
                photoURL={photo}
                onChangeName={setUserName}
                onChangePhoto={setPhoto}
            />
            <Pressable onPress={updateProfile} style={styles.button}>
                <TextField>Continuar</TextField>
            </Pressable>
        </OuterScreenContainer>
    );
};

const Styles = (theme: Theme) => StyleSheet.create({
    button: {
        paddingHorizontal: 32,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        borderWidth: 1.5,
        borderColor: theme.border,
        backgroundColor: theme.button,
    },
})

export default SetProfile;
