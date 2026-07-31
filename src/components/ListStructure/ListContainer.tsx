import { View, ScrollView, StyleSheet, Pressable } from 'react-native';

type Props = {
    children: React.ReactNode;
};

const ListContainer = ({ children }: Props) => {
    return (
        <View style={Styles.container}>
            <ScrollView style={Styles.scroll}>
                {children}
            </ScrollView>
            {/* <SwitchReplyModal isModalOpen={isModalOpen} closeModal={closeModal} currentReply={false} /> */}
        </View>
    )
};

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#2F1805',
        borderRadius: 32,
    },
    scroll: {
        borderRadius: 32,
    },
});

export default ListContainer;
