import { View, StyleSheet } from 'react-native';

type Props = {
    children: React.ReactNode;
    index: number;
    isLast: boolean;
};

const ListRow = ({ children, index, isLast }: Props) => {
    const isEven = (i: number) => i % 2 === 0;

    return (
        <View
            style={[
                Styles.row,
                isEven(index) ? Styles.evenRow : Styles.oddRow,
                (index === 0) && Styles.firstRow,
                isLast && Styles.lastRow, 
            ]}>
                {children}
        </View>
    )
};

const Styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 20,
        minHeight: 65,
    },
    evenRow: {
        backgroundColor: '#FCF9D9',
    },
    oddRow: {
        backgroundColor: '#FAFBFB',
    },
    firstRow: {
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
    },
    lastRow: {
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    }
});

export default ListRow;
