export interface ISignupResponse {
    errors?: [{ message: string }],

    data: {
        createUser: {
            token: string;
            id: string;
        }
    }
}

export interface ILoginResponse {
    errors?: [{ message: string }],

    data: {
        login: {
            token: string;
            id: string;
        }
    }
}

export interface IGetUserByEmail {
    errors?: [{ message: string }],

    userByEmail: {
        name: string;
        email: string;
        _id: string;
    }
}

export interface IGetUserByID {
    errors?: [{ message: string }],

    user: {
        name: string;
        email: string;
        _id: string;
    }
}

export interface IForgotPassword {
    errors?: [{ message: string }],

    forgotPassword: boolean
}

export interface IResetPassword {
    errors?: [{ message: string }],

    resetPassword: boolean
}

