import { handleActions, createAction } from 'redux-actions';

export const updateSomeData = createAction('UPDATE_SOME_DATA');

const INITIAL_STATE = {
    someData: 'test'
}

export default handleActions({
    [updateSomeData]: (state, { payload }) => ({
        ...state,
        someData: payload,
    }),
}, INITIAL_STATE)


