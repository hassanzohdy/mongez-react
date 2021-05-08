export const getItem = (items, value, grouped = false) => {
    if (grouped) {
        let foundItem;
        items.forEach(itemGroup => {
            if (!foundItem) {
                foundItem = itemGroup.items.find(item => item.value === value);
            }
        });

        return foundItem;
    }
    return items.find(item => item.value === value);
};

export const getItems = (items, values, grouped = false) => {
    if (grouped) {
        let foundItems;
        items.forEach(itemGroup => {
            if (!foundItems) {
                foundItems = itemGroup.items.filter(item => values.includes(item.value));
            }
        });

        return foundItems || [];
    }

    return items.filter(item => values.includes(item.value));
};