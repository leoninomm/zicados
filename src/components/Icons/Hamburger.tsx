import Svg, { Path } from 'react-native-svg';

const Hamburger = () => (
    <Svg width="32px" height="32px" viewBox="0 0 24 24" fill="none">
        <Path d="M20 7L4 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
        <Path d="M20 12L4 12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
        <Path d="M20 17L4 17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
    </Svg>
);

export default Hamburger;
