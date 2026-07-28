import { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Pressable } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import { useTheme } from '../hooks/useTheme';
import TextField from '../components/Textfield';
import AddPhoto from '../components/Icons/AddPhoto';

import type { Theme } from '../utils/theme';

type Props = {
    displayName?: string;
    photoURL?: string;
    birthday?: string;
    onChangeName: (name: string) => void;
    onChangePhoto: (photo: string) => void;
    onChangeBirthday: (date: string) => void;
};

const ProfileSettings = ({
    displayName,
    photoURL,
    birthday,
    onChangeName,
    onChangePhoto,
    onChangeBirthday,
}: Props) => {
    const [openDatePicker, setOpenDatePicker] = useState(false);

    const theme = useTheme();
    const styles = Styles(theme);

    const handleImagePicker = async() => {
        const callBack = (p: any) => {
            if (p.assets) {
                console.log(p.assets[0]);
                onChangePhoto(p.assets[0]?.uri || '')
            }
        };
        const result = await launchImageLibrary({ mediaType: 'photo' }, callBack);
        // console.log(result);
    };

    const handleDatePicker = (date: Date) => {
        const dateStr = date.toLocaleDateString('pt-br');
        onChangeBirthday(dateStr);
        setOpenDatePicker(false);
    }

    return (
        <View style={{ gap: 32 }}>
            <View style={{ gap: 4 }}>
                <TextField>Nome do jogador:</TextField>
                <TextInput
                    value={displayName}
                    onChangeText={onChangeName}
                    style={styles.input}
                />
            </View>
            <View style={{ gap: 4 }}>
                <TextField>Carinha do jogador:</TextField>
                <Pressable onPress={handleImagePicker} style={styles.addImageButton}>
                    {photoURL ? <Image src={photoURL} style={styles.imagePreview} /> : <AddPhoto />}
                </Pressable>
            </View>
            <View style={{ gap: 4 }}>
                <TextField>Aniversário do jogador:</TextField>
                <Pressable onPress={() => setOpenDatePicker(true)} style={styles.input}>
                    <TextField>{birthday || 'Mistério'}</TextField>
                </Pressable>
                <DatePicker
                    modal
                    open={openDatePicker}
                    date={new Date()}
                    mode='date'
                    locale='pt-br'
                    onConfirm={(date) => handleDatePicker(date)}
                    onCancel={() => setOpenDatePicker(false)}
                />
            </View>
        </View>
    );
};

const Styles = (theme: Theme) => StyleSheet.create({
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

export default ProfileSettings;
