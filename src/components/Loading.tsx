import { View, ActivityIndicator, Dimensions } from 'react-native';

const Loading = () => {
    const { height, width } = Dimensions.get('window');

    return (
        <View
            style={{
                position: 'absolute',
                height: height,
                width: width,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
        >
            <ActivityIndicator size={100} color='#FAFBFB' />
        </View>
    );
};

export default Loading;
