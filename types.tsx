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
    clearUser: () => void;
}

export type {
    IUser,
    IUserContext
}