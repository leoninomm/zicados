import React, { useState, useEffect } from 'react';
import { Pressable, View, ViewStyle, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import ArrowDown from './Icons/ArrowDown';

import type { Theme } from '../utils/theme';

type AccordionProps = {
    initialHeight: number,
    expandedHeight: number,
    title: React.ReactNode,
    children?: React.ReactNode,
    style?: ViewStyle,
    disabled?: boolean
}

const Accordion = ({
    initialHeight,
    expandedHeight,
    title,
    children,
    style,
    disabled = false,
}: AccordionProps) => {
    const [expanded, setExpanded] = useState(false);
    const [showContent, setShowContent] = useState(false);
    // const [expandedHeight, setExpandedHeight] = useState(0);
    const height = useSharedValue(initialHeight);

    useEffect(() => {
        if(expanded) {
            height.value = initialHeight + expandedHeight;
        }

    }, [expandedHeight, children])

    useEffect(() => {
        if (disabled) setExpanded(false);
        height.value = initialHeight;
    }, [disabled])

    useEffect(() => {
        if (expanded) {
            setTimeout(() => setShowContent(true), 130);
        } else setShowContent(false);
    }, [expanded])

    const theme = useTheme() as Theme;

    const handlePress = () => {
        if (!disabled) {
            if (expanded) {
                height.value = withSpring(height.value - expandedHeight); 
            } else {
                height.value = withSpring(height.value + expandedHeight);
            }
            setExpanded(!expanded)
        }
    };

    // const handleLayout = (event: any) => {
    //     const { height: contentHeight } = event.nativeEvent.layout;

    //     setExpandedHeight(contentHeight + 20);
    // };

    const styles = Styles(theme);

    return (
        <Pressable onPress={handlePress} style={{ ...style, marginBottom: 15 }}>
            <Animated.View style={{ height: height }}>
                    <View style={{ ...styles.titleContainer, height: initialHeight }}>
                        <View style={styles.title}>{title}</View>
                        <View style={ArrowStyle(expanded).arrow}>
                            {!disabled && <ArrowDown />}
                        </View>
                    </View>
                    <View>
                        {showContent && children}
                    </View>
            </Animated.View>
        </Pressable>
    )
};

const Styles = (theme: Theme) => StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        flex: 1,
    },
});

const ArrowStyle = (expanded: boolean) => StyleSheet.create({
    arrow: {
        transform: [
            { rotateX: expanded ? '180deg' : '0deg' }
        ],
    },
})



export default Accordion;
