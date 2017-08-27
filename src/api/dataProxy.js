import { asyncify, paged } from '../utils';
    
export default {
    getItems: asyncify(getItems),
    updateItem: asyncify(updateItem),
}

// mock data
const testData = [
    { id: 'def', value: 'abc', checked: false },
    { id: 'xyz', value: 'qwe', checked: false },
    { id: 'abc', value: 'qwe', checked: true },
    { id: 'mnp', value: 'qwe', checked: true },
    { id: 'zyx', value: 'abc', checked: false },
]

const filterableFieldSelectors = [
    item => item.value,
    item => item.id,
]

// mock api
function getItems(pager){
    
    console.log('get-items');

    const pagedData = paged(testData, pager, filterableFieldSelectors);

    console.log('paged', pagedData);
    return pagedData.data;
};

function updateItem(item) {    
    console.log('update-item');

    const index = testData.findIndex(i => i.id === item.id);
    const [ removed ] = testData.splice(index, 1, item);
    return removed;
};