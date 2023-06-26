import {ItemStack, isValidItem} from './itemstack.js';

export class Storage {

    constructor() {
        this.inventory = {};
    }

    push(item_name, amount) {
        if (isValidItem(item_name)) { // check if it's valid item
            if (item_name in this.inventory) {  // if already in inv
                this.inventory[item_name] += amount;
            } else {  // otherwise create new entry in inv
                this.inventory[item_name] = amount;
            }
        }
    }


}