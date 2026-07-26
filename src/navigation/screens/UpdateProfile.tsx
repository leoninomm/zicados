import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '@react-native-firebase/auth';
import { setUserProfile } from '../../store/auth/authThunk';
import { useTheme } from '../../hooks/useTheme';
import TextField from '../../components/Textfield';
import ProfileSettings from '../../components/ProfileSettings';
import InnerScreenContainer from '../../components/ScreenContainers/InnerScreenContainer';

import type { ProfilePayload } from '../../utils/types';
import type { Theme } from '../../utils/theme';
import type { AppDispatch, RootState } from '../../store/store';

const UpdateProfile = () => {
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [loadedFile, setLoadedFile] = useState(false);

    const user = getAuth().currentUser;
    const { loading } = useSelector((state: RootState) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();

    const hanldeChangePhoto = (p: string) => {
        setPhoto(p);
        setLoadedFile(true);
    }

    const updateProfile = () => {
        if (!name && !photo) return;

        const payload: ProfilePayload = { displayName: name, photoURL: photo };
        if (!name) delete payload.displayName;
        if (!photo) delete payload.photoURL;

        dispatch(setUserProfile(payload, loadedFile));
    };

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setPhoto(user.photoURL || '');
        };
    }, []);

    const styles = Styles(theme);

    return (
        <InnerScreenContainer loading={loading}>
            <View style={styles.content}>
                <ProfileSettings
                    displayName={name}
                    photoURL={photo}
                    onChangeName={setName}
                    onChangePhoto={hanldeChangePhoto}
                />
                <Pressable onPress={updateProfile} style={styles.button}>
                    <TextField>Atualizar</TextField>
                </Pressable>
            </View>
        </InnerScreenContainer>
    );
};

const Styles = (theme: Theme) => StyleSheet.create({
    content: {
        marginTop: 100,
        gap: 64,
        alignItems: 'center',
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
    },
});

export default UpdateProfile;
