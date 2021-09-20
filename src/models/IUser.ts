export interface IUser {
    email: string,
    password: string,
    name: string,
    age?: number,
    createdAt?: string,
    updatedAt?: string,
    __v?: number,
    _id?: string
}

export interface IData {
    token: string,
    user: IUser
}