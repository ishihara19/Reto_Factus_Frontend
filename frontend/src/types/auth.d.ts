
export type  AuthPayload = {
    username: string,
    password: string,
}

export type AuthResponse = {
    access_token: string,
    refresh_token: string,

}

export type UserChangePassword = {
    current_password: string,
    new_password: string,
    confirm_password: string,
}