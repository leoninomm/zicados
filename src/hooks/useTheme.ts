import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { LightTheme, DarkTheme } from '../utils/theme';
import type { RootState } from '../store/store';

export const useTheme = () => {
    const { theme } = useSelector((state: RootState) => state.preferencesReducer);
    let pallete;
    if (theme === 'LIGHT') pallete = LightTheme;
    else pallete = DarkTheme;

    return pallete;
}
