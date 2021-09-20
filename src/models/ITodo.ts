export interface ITodo {
    description: string,
    completed?: boolean,
    _id: string,
    owner?: string,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
}

export interface ITodoListRequest {
    data: ITodo[]
}

export interface ITodoRequest {
    data: ITodo
}
