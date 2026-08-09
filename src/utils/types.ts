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
    CreateOpenList = 'CreateOpenList',
    EditOpenList = 'EditOpenList',
    SelectPayer = 'SelectPayer',
    CreatePendingList = 'CreatePendingList',
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

export type OpenListPlayer = {
    uid: string;
    willAttend: boolean;
};

export type Guest = {
    guestName: string;
    playerResponsible: string;
};

export type ListGuest = {
    guestName: string;
    playerResponsible: string;
    guestTag: string;
}

export type OpenList = {
    id: string;
    owner: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    minPlayers: number;
    maxPlayers: number;
    isClosed: boolean;
};

export enum FBCollections {
    Users = 'users',
    OpenList = 'openList',
    PendingList = 'pendingList',
    ClosedList = 'closedList',
    PlayersCol = 'PlayersCol',
    GuestsCol = 'GuestsCol',
};

export enum FBConfig {
    StartTime = 'startTime',
    EndTime = 'endTime',
    Location = 'location',
    MinPlayers = 'minPlayers',
    MaxPlayers = 'maxPlayers',
};
