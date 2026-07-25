import { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { createAccount } from '../../store/auth/authThunk';
import { useTheme } from '../../hooks/useTheme';
import TextField from '../../components/Textfield';
import ArrowLeft from '../../components/Icons/ArrowLeft';
import Logo from '../../assets/zicados-logo.png';

import { Screens } from '../../utils/types';
import type { AppDispatch } from '../../store/store';
import type { Theme } from '../../utils/theme';

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const handleCreateAccount = () => {
        if (!email || !password || !repeatPassword) return;
        if (password !== repeatPassword) return;

        dispatch(createAccount(email, password));
    }

    const styles = Styles(theme);

    return (
        <View style={{
            ...styles.container,
            paddingTop: insets.top + 100,
            paddingRight: insets.right,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left
        }}>
            <Image source={Logo} style={styles.logo} />
            <View>
                <TextField>Email:</TextField>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
            </View>
            <View>
                <TextField>Senha:</TextField>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
            </View>
            <View>
                <TextField>Repita a senha:</TextField>
                <TextInput
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                    style={styles.input}
                />
            </View>
            <Pressable onPress={handleCreateAccount} style={styles.button}>
                <TextField>Criar conta</TextField>
            </Pressable>
            <Pressable onPress={() => navigation.navigate(Screens.SignIn)} style={styles.backButton}>
                <ArrowLeft />
                <TextField>Voltar</TextField>
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
    backButton: {
        flexDirection: 'row',
        gap: 4,
    }
});

export default CreateAccount;