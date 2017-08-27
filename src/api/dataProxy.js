import { asyncify } from '../utils';
    
export default {
    getItems: asyncify(getItems),
    updateItem: asyncify(updateItem),
}

// mock data
const data = [
    { id: 'adfadf', value: 'someBal', checked: false },
    { id: 'yjg', value: 'qwe', checked: false },
    { id: 'tyr', value: 'zcv', checked: true },
    { id: 'bmn', value: 'iop', checked: true },
    { id: 'wer', value: 'sg', checked: false },
]

// mock proxy calls
function getItems(pager){
    
    console.log('get');

    const regex = new RegExp(pager.filter, 'i');
    return data
        .filter(item => !pager.filter || regex.test(item.value))
        .sort((item1, item2) => 0)
        .slice(pager.skip, pager.take)   
};

function updateItem(item) {
    
    console.log('update');

    const index = data.findIndex(i => i.id === item.id);
    data.splice(index, 1, item);
    return item;
};