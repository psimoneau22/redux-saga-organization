import { createAction } from 'redux-actions';
import { call, takeEvery, take, cancel, fork, all, put } from 'redux-saga/effects'
import { delay } from 'redux-saga';
import { dataProxy } from '../api'
import { updateFilter, updateItem, updateItems, updateStatus, selectors } from '../modules/list';

// actions
export const itemsRequested = createAction('ITEMS_REQUESTED')
export const filterChanged = createAction('FILTER_CHANGED')
export const itemChanged = createAction('ITEM_CHANGED')

// sagas
export default function* root(){    
    yield all([
        takeEvery(itemsRequested, pageItems),
        watchFilterChange(),
        watchItemUpdate(),
    ])
};

function* pageItems() {
    const pager = yield selectors.pager();
    const pagedItems = yield call(fetchItems, pager);
    yield put(updateItems(pagedItems));
    return pagedItems;
}

function* watchFilterChange() {
    let task;
    while(true){
        let { payload: filter } = yield take(filterChanged);
        if(task) {
            yield cancel(task);
        }
        task = yield fork(handleChangeFilter, filter);
    } 
}

function* watchItemUpdate() {
    let task;
    while(true){
        let { payload: item } = yield take(itemChanged);
        if(task) {
            yield cancel(task);
        }
        task = yield fork(handleUpdateItem, item);
    }
}

function* handleChangeFilter(filter) {
    yield put(updateFilter(filter));
    yield call(delay, 350);
    yield call(pageItems);  
}

function* handleUpdateItem(item) {
    yield put(updateItem(item));
    yield call(delay, 350);
    yield call(dataProxy.updateItem, item);
}

function* fetchItems(pager) {
    yield put(updateStatus(true));    
    try {
        return yield call(dataProxy.getItems, pager);
    }
    finally {
        yield put(updateStatus(false));
    }
}