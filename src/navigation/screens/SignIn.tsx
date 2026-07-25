import { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { signIn, googleSignIn } from '../../store/auth/authThunk';
import { useTheme } from '../../hooks/useTheme';
import TextField from '../../components/Textfield';
import Logo from '../../assets/zicados-logo.png';
import Google from '../../assets/google.png';

import { Screens } from '../../utils/types';
import type { AppDispatch } from '../../store/store';
import type { Theme } from '../../utils/theme';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const handleLogin = () => {
        if (!email || !password) return;

        dispatch(signIn(email, password));
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
                    secureTextEntry
                />
            </View>
            <Pressable onPress={handleLogin} style={styles.button}>
                <TextField>Logar</TextField>
            </Pressable>
            <Pressable onPress={() => navigation.navigate(Screens.CreateAccount)} style={styles.button}>
                <TextField>Criar conta</TextField>
            </Pressable>
            <Pressable onPress={() => dispatch(googleSignIn())} style={styles.googleButton}>
                <Image source={Google} style={{height: 20, width: 20}}/>
                <TextField>Faça login com Google</TextField>
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
    googleButton: {
        flexDirection: 'row',
        gap: 8,
        padding: 12,
        borderWidth: 1,
        borderRadius: 32,
        backgroundColor: 'white',
    }
})

export default SignIn;
