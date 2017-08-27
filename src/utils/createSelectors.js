import { select } from 'redux-saga/effects';

export default function createSelectors(stateSlice, selectorMap){
    return Object.keys(selectorMap)
        .reduce((result, key) => {
            result[key] = () => select(state => selectorMap[key](stateSlice(state)));
            return result;
        }, {})
};