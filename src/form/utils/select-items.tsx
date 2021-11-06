import Is from '@flk/supportive-is';

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
    if (! Is.empty(values)) {
        values = values.map(value => {
            if (Is.scalar(value)) return value;

            return value.id || value.value || value.name;
        });
    }

    if (grouped) {
        let foundItems;
        items.forEach(itemGroup => {
            if (!foundItems) {
                foundItems = itemGroup.items.filter(item => {
                    return values.includes(item.value);
                });
            }
        });

        return foundItems || [];
    }

    return items.filter(item => values.includes(item.value));
};