export interface Login {
    email: string,
    password: string
}

export interface AuthTokens {
    access: string,
    refresh: string
}

export interface TokenRefresh {
    refresh: string
}

export interface AccessTokenResponse {
    access: string
}
