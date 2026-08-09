import { View, Pressable, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import TextField from '../../components/Textfield';
import InnerScreenContainer from '../../components/ScreenContainers/InnerScreenContainer';

import type { RootState } from '../../store/store';

const CreatePendingList = () => {
    const { list } = useSelector((state: RootState) => state.openListReducer);

    return (
        <InnerScreenContainer>
            <ScrollView>
                <View style={Styles.content}>
                    <TextField bold>Encerrar lista para pagamento</TextField>
                    <View style={{ gap: 4 }}>
                        <TextField>Valor</TextField>
                        <TextInput />
                    </View>
                    <View style={{ gap: 4 }}>
                        <TextField>Quem pagou</TextField>
                    </View>
                    <View style={{ gap: 4 }}>
                        <TextField>Informações de pagamento</TextField>
                        <TextInput />
                    </View>
                    <View style={{ gap: 4 }}>
                        <TextField>Tempo de permanência</TextField>
                    </View>
                </View>
            </ScrollView>
        </InnerScreenContainer>
    );
};

const Styles = StyleSheet.create({
    content: {
        width: '100%',
        marginTop: 80,
        gap: 16,
        alignItems: 'flex-start',
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 2,
        borderColor: '#030626',
        borderRadius: 32,
        backgroundColor: 'white',
        padding: 8,
        fontSize: 16,
        fontFamily: 'Inter',
    },
    timeInputField: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 32,
    },
    button: {
        paddingHorizontal: 32,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        borderWidth: 1.5,
        borderColor: '#030626',
        backgroundColor: '#F2B705',
        flexDirection: 'row',
        gap: 12,
        marginTop: 32,
    },
});

export default CreatePendingList;
