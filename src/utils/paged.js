export default function paged(items, { filter, sort, page, pageSize }, filterableFieldSelectors) {
    let data = filterItems(items, filter, filterableFieldSelectors);
    const total = data.length;
    data = sortItems(data, sort);
    data = pageItems(data, page, pageSize);

    return { total, data }
}

function filterItems(items, filter, filterableFieldSelectors = []){
    const regex = new RegExp(filter, 'i');
    return items.filter(item => !filter ||
        filterableFieldSelectors.some(fieldSelector => regex.test(fieldSelector(item)))
    );
}

function sortItems(items, sort){
    const data = [...items];
    data.sort(compareItems(sort))
    return data;
}

function pageItems(items, page, pageSize) {
    const skip = page ? (page - 1) * pageSize: 0;
    const take = page ? pageSize: 0;
    return items.slice(skip, skip + take);
}

function compareItems(sort){
    return (item1, item2) => {
        for(const { field, dir } of sort) {
            const val1 = item1[field];
            const val2 = item2[field];
            const modifier = dir === 'asc' ? 1 : -1;

            if(val1 === val2) 
                continue;
            return modifier * (val1 > val2 ? 1 : -1);
        }
        return 0;
    }
}