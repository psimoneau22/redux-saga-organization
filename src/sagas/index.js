import { all } from 'redux-saga/effects';
import list from './list';
import detail from './detail';

export default function* sagas() {
    yield all([
        list(),
        detail(),
    ])
}