import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

const ArrowDown = () => (
    <Svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
        <G clip-path="url(#clip0_429_11251)">
            <Path d="M7 10L12 15" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M12 15L17 10" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </G>
        <Defs>
            <ClipPath id="clip0_429_11251">
                <Rect width="24" height="24" fill="white"/>
            </ClipPath>
        </Defs>
    </Svg>
);

export default ArrowDown;
