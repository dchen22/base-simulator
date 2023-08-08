export class ItemStack {
    constructor(name, count) {
        this.name = name;
        this.count = count;
    }
}

// all valid item names, and their price
export const valid_items_values = { 'ender pearl': 1, 'bottle of honey': 2 };

export const valid_items_arr = Object.keys(valid_items_values);

export const valid_items = new Set(valid_items_arr);


export function isValidItem(item_name) {
    return valid_items.has(item_name);
}