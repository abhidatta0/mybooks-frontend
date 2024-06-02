export type LoginUserObject = {
    "id": number,
    "created_at": string,
    "updated_at": string,
    "email": string
    "username": string
}

export type LoginRequest = {
    "password":string,
    "email":string
}

export type LoginResponse = {
    user:LoginUserObject,
}

export type RegisterRequest = {
    "username":string,
    "password":string,
    "email":string,
}