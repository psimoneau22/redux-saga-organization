import { all, takeEvery, take, call, put, actionChannel } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { updateSomeData } from '../modules/detail';
import { createAction } from 'redux-actions';

export const someAction = createAction('SOME_ACTION_HAPPENED');

export default function* root(){
    yield all([
        takeEvery(someAction, handleDataUpdate),
        testMultiple(),
    ])
}

function* handleDataUpdate({ payload }){
    yield call(console.log, 'updatingData', payload);
    yield put(updateSomeData(payload));
}

function* testMultiple(){
    let start = Date.now();
    const channel = yield actionChannel(someAction)
    while(true) {
        const action = yield take(channel);
        yield call(console.log, 'testHappened', Date.now() - start, action);
        start = Date.now();
        yield call(delay, 2000)
    }
}