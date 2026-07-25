export interface Theme {
    dark: boolean;
    text: string;
    background: string;
    border: string;
    button: string;
}

export const LightTheme: Theme = {
    dark: false,
    text: '#000000',
    background: '#FAFBFB',
    border: '#030626',
    button: '#F2B705',
};

export const DarkTheme: Theme = {
    dark: true,
    text: '#FFFFFF',
    background: '#030626',
    border: '#fcf9d9',
    button: '#97C926',
};
