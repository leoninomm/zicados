import { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../store/auth/authThunk';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../../hooks/useTheme';
import TextField from '../../components/Textfield';
import AddPhoto from '../../components/Icons/AddPhoto';
import Logo from '../../assets/zicados-logo.png';

import type { Theme } from '../../utils/theme';
import type { AppDispatch } from '../../store/store';

const SetProfile = () => {
    const [userName, setUserName] = useState('');
    const [photo, setPhoto] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const styles = Styles(theme);

    const handleImagePicker = async() => {
        const callBack = (p: any) => {
            if (p.assets) {
                setPhoto(p.assets[0]?.uri || '')
            }
        };
        const result = await launchImageLibrary({ mediaType: 'photo' }, callBack);
        // console.log(result);
    }

    const updateProfile = () => {
        if (!userName || !photo) return;
        dispatch(setUserProfile(userName, photo));
    };

    return (
        <View style={{
            ...styles.container,
            paddingTop: insets.top + 100,
            paddingRight: insets.right + 20,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left + 20
        }}>
            <Image source={Logo} style={styles.logo} />
            <View style={{ gap: 32 }}>
                <View style={{ gap: 4 }}>
                    <TextField>Nome do jogador:</TextField>
                    <TextInput
                        value={userName}
                        onChangeText={setUserName}
                        style={styles.input}
                    />
                </View>
                <View style={{ gap: 4 }}>
                    <TextField>Carinha do jogador:</TextField>
                    <Pressable onPress={handleImagePicker} style={styles.addImageButton}>
                        {photo ? <Image src={photo} style={styles.imagePreview} /> : <AddPhoto />}
                    </Pressable>
                </View>
            </View>
            <Pressable onPress={updateProfile} style={styles.button}>
                <TextField>Continuar</TextField>
            </Pressable>
        </View>
    );
};

const Styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.background,
        gap: 32,
    },
    logo: {
        height: 100,
        width: 100,
        marginBottom: 40,
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 2,
        borderColor: theme.border,
        borderRadius: 32,
        backgroundColor: 'white',
        padding: 8,
        fontSize: 16,
        fontFamily: 'Inter',
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
    addImageButton: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: theme.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePreview: {
        height: 98,
        width: 98,
        borderRadius: 50,
    }
})

export default SetProfile;
