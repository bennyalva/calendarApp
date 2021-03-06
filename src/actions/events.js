import { types } from "../types/types";

export const eventAddNew = (event) =>({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) =>({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveAction = () => ({
    type: types.eventClearActive
});

export const eventUpdatedAction = (event) => ({
    type: types.eventUpdated,
    payload: event
});
export const eventDeletedAction = () => ({
    type: types.eventDeleted
})