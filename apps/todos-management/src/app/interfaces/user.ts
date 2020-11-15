export interface IUser {
    createdAt: any;
    displayName: string;
    email: string;
    id: string;
}

export interface IUserState {
    currentUser: IUser|null;
    signInError: any|null;
    registrationError: any|null;
    pageLoading: boolean;
    signInProgress: boolean;
}

export interface ITodosState {
    todos: ITodo[] | [];
    isFetching?: boolean;
    hasError?: boolean;
    isProcessing?: boolean;
}

export interface IStore {
    user: IUserState;
    todos: ITodosState
}

export interface ITodo {
    userId: string;
    date: string;
    todoId: string;
    title: string;
    description: string;
}
