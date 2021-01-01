export interface Action {
    type: string;
    payload: any;
}

export type Reducer<T> = (state: T, action: Action) => T;
