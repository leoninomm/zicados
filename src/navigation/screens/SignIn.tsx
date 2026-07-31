import { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, googleSignIn } from '../../store/auth/authThunk';
import { useTheme } from '../../hooks/useTheme';
import OuterScreenContainer from '../../components/ScreenContainers/OuterScreenContainer';
import Eye from '../../components/Icons/Eye';
import EyeSlash from '../../components/Icons/EyeSlash';
import TextField from '../../components/Textfield';
import Google from '../../assets/google.png';

import { Screens } from '../../utils/types';
import type { AppDispatch, RootState } from '../../store/store';
import type { Theme } from '../../utils/theme';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { loading } = useSelector((state: RootState) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const theme = useTheme();

    const handleLogin = () => {
        if (!email || !password) return;

        dispatch(signIn(email.trim(), password));
    }

    const styles = Styles(theme);

    return (
        <OuterScreenContainer loading={loading}>
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
                <View style={styles.inputField}>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        style={styles.innerInput}
                    />
                    <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <EyeSlash /> : <Eye />}
                    </Pressable>
                </View>
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
        </OuterScreenContainer>
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
    inputField: {
        width: 300,
        height: 40,
        borderWidth: 2,
        borderColor: theme.border,
        borderRadius: 32,
        backgroundColor: 'white',
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    innerInput: {
        width: 250,
        height: 40,
        color: theme.text,
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
