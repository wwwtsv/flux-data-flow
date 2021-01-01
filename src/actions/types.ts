export enum Actions {
    CHANGE_VALUE = "change-value",
}

export const getSearchFiles = (fileList: Array<string>) => ({
    type: Actions.CHANGE_VALUE,
    payload: fileList,
});
