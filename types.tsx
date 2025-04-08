interface ProfileData {
    profilePic?: string;
    name?: string;
    dob?: string;
    // add more fields as needed
}

interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    profileData: ProfileData;
    __v: number;
}

interface IUserContext {
    user: IUser | null;
    updateUser: (userData: IUser) => void;
    fetchUser: (id: string) => Promise<void>;
    clearUser: () => void;
}

interface IAppContext {
    isLoggedIn: boolean;
    updateLoggedIn: (status: boolean) => void;
}

export type {
    IUser,
    IUserContext,
    IAppContext
}