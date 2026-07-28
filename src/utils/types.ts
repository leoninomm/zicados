export enum Screens {
    SignIn = 'SignIn',
    CreateAccount = 'CreateAccount',
    SetProfile = 'SetProfile',
    Drawer = 'Drawer'
};

export enum Drawer {
    Home = 'Home',
    UpdateProfile = 'UpdateProfile',
    Players = 'Players',
};

export type ProfilePayload = {
    displayName?: string | null;
    photoURL?: string | null;
};

export type SetProfilePayload = {
    displayName: string;
    photoURL: string;
    birthday?: string;
};

export type UpdateProfilePayload = {
    profile: ProfilePayload;
    birthday?: string;
}

export type Player = {
    uid: string;
    displayName: string;
    photoURL: string;
    birthday: string;
};
