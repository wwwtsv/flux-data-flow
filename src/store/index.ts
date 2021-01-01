import { isEqual, cloneDeep } from "lodash";
import { Action, Reducer } from "./types";
import { InitialState } from "../view/types";
import SearchFileView from "../view";

class Store<T, S> {
    protected state: T;
    protected subscribers: Array<S> = [];
    protected readonly reducer: Reducer<T>;

    protected constructor(initialState: T, reducer: Reducer<T>) {
        this.state = initialState;
        this.reducer = reducer;
    }

    public getState(): T {
        return this.state;
    }

    public subscribe(subscriber: S): void {
        this.subscribers.push(subscriber);
    }

    public unsubscribe(subscriber: S): void {
        this.subscribers.filter((e) => e !== subscriber);
    }

    protected areEqual(one: T, two: T): boolean {
        return isEqual(one, two);
    }
}

export default class FileStore extends Store<InitialState, SearchFileView> {
    constructor(state: InitialState, reducer: Reducer<InitialState>) {
        super(state, reducer);
    }

    public dispatch(action: Action) {
        const newState = this.reducer(this.state, action);
        if (!super.areEqual(this.state, newState)) {
            this.state = cloneDeep(newState);
            this.emitChange();
        }
    }

    private emitChange() {
        this.subscribers.forEach((subscriber) =>
            subscriber.rerender(this.state)
        );
    }
}
