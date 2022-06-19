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

export interface Meta {
    color: string
    important: boolean
    bookmark: boolean
}

export interface Tag {
    id: number
    title: string
    meta: Meta
}

export interface Category {
    id: number
    title: string
    parent: Category | null
    meta: Meta
}

export interface Note {
    id: number
    title: string,
    content: string
    tags: Tag[]
    category: Category
    meta: Meta
    created_at: string
    updated_at: string
}
