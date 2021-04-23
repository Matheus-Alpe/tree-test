const categories = require('./category.json')

/*
{
    "coca": {
        "fanta": {}
        "sprite": {}
    },
    "roupa": {}
}
*/

function recursive(object, isRecursive) {
    const cloneObject = { ...object };

    categories.forEach((category) => {
        if (object[category.parent]) {
            object[category.parent] = {
                ...object[category.parent],
                [category.id]: {},
            };
            return recursive(object[category.parent], true);
        }

        if (!category.parent && !isRecursive) {
            object[category.id] = {};
        }
    });

    return JSON.stringify(object) === JSON.stringify(cloneObject)
        ? object
        : recursive(object, true);
}

console.log(JSON.stringify(recursive({}), null, 4));
