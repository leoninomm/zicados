import { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../../store/auth/authThunk';
import { useTheme } from '../../hooks/useTheme';
import OuterScreenContainer from '../../components/ScreenContainers/OuterScreenContainer';
import TextField from '../../components/Textfield';
import ArrowLeft from '../../components/Icons/ArrowLeft';

import { Screens } from '../../utils/types';
import type { AppDispatch, RootState } from '../../store/store';
import type { Theme } from '../../utils/theme';
import EyeSlash from '../../components/Icons/EyeSlash';
import Eye from '../../components/Icons/Eye';

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeate, setShowRepeate] = useState(false);



    const { loading } = useSelector((state: RootState) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const theme = useTheme();

    const handleCreateAccount = () => {
        if (!email || !password || !repeatPassword) return;
        if (password !== repeatPassword) return;

        dispatch(createAccount(email, password));
    }

    const styles = Styles(theme);

    return (
        <OuterScreenContainer loading={loading}>
            <View>
                <TextField>Email</TextField>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
            </View>
            <View>
                <TextField>Senha</TextField>
                <View style={styles.inputField}>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        style={styles.innerInput}
                    />
                    <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <EyeSlash /> : < Eye />}
                    </Pressable>
                </View>
            </View>
            <View>
                <TextField>Repita a senha</TextField>
                <View style={styles.inputField}>
                    <TextInput
                        value={repeatPassword}
                        onChangeText={setRepeatPassword}
                        secureTextEntry={!showRepeate}
                        style={styles.innerInput}
                    />
                    <Pressable onPress={() => setShowRepeate((prev) => !prev)}>
                        {showRepeate ? <EyeSlash /> : < Eye />}
                    </Pressable>
                </View>
            </View>
            <Pressable onPress={handleCreateAccount} style={styles.button}>
                <TextField>Criar conta</TextField>
            </Pressable>
            <Pressable onPress={() => navigation.navigate(Screens.SignIn)} style={styles.backButton}>
                <ArrowLeft />
                <TextField>Voltar</TextField>
            </Pressable>
        </OuterScreenContainer>
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
    backButton: {
        flexDirection: 'row',
        gap: 4,
    }
});

export default CreateAccount;