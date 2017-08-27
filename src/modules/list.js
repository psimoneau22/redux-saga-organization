import { handleActions, createAction } from 'redux-actions';
import { createSelectors } from '../utils';

// state
const INITIAL_STATE = {
    loading: false,
    items: [],
    filter: '',
}

// selectors
export const selectors = createSelectors(state => state.list, {
    pager: ({ filter, page, sort }) => ({ filter, skip: 0, take: 10, sort }),
    items: state => state.items,
});

// actions
export const updateStatus = createAction('UPDATE_STATUS')
export const updateItems = createAction('UPDATE_ITEMS')
export const updateItem = createAction('UPDATE_ITEM')
export const updateFilter = createAction('UPDATE_FILTER')

// reducer
export default handleActions({
    
    [updateStatus]: (state, { payload: loading }) => ({
        ...state,
        loading,
    }),

    [updateItems]: (state, { payload: items }) => ({
        ...state,
        items,
    }),

    [updateItem]: (state, { payload: item }) => {
        const items = state.items.map(i => item.id === i.id ? item : i);
        return {
            ...state,
            items,
        }
    },

    [updateFilter]: (state, { payload: filter }) => ({
        ...state,
        filter,
    }),

}, INITIAL_STATE)