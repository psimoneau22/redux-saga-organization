import { all, takeEvery, call, put } from 'redux-saga/effects';
import { updateSomeData } from '../modules/detail';
import { createAction } from 'redux-actions';

export const someAction = createAction('SOME_ACTION_HAPPENED');

export default function* root(){
    yield all([
        takeEvery(someAction, handleDataUpdate),
    ])
}

function* handleDataUpdate({ payload }){
    yield call(console.log, 'updatingData', payload);
    yield put(updateSomeData(payload));
}