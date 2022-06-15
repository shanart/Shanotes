export interface Login {
    email: string,
    password: string
}

export interface AuthTokens {
    access: string,
    refresh: string
}
