import { Storage } from './storage.js';
import { ItemStack, valid_items, valid_items_values, valid_items_arr } from './itemstack.js';

let balance = 0;
let inventory = {};
let storages_list = {};
let shop_items = [];
let income_list = {};

// menu buttons
let gen_man_button = document.getElementById('generate_manually_btn');
let open_shop_button = document.getElementById('open_shop_btn');
let reset_shop_button = document.getElementById('reset_shop_btn');
let open_inv_button = document.getElementById('open_inventory_btn');
let open_storages_button = document.getElementById('open_storages_btn');
let open_income_button = document.getElementById('open_income_btn');

let menu_list = {
    'SHOP_MENU': document.getElementById('shop_menu'),
    'INVENTORY_MENU': document.getElementById('inventory_menu'),
    'STORAGE_MENU': document.getElementById('storage_menu'),
    'INCOME_MENU': document.getElementById('income_menu')
}
let current_menu = 'INVENTORY_MENU'; // just make a default



gen_man_button.addEventListener("click", function() {
    balance += 1;
    document.getElementById('balance').innerHTML = String(balance);
});

// OPEN SHOP
open_shop_button.addEventListener("click", function() {
    switch_to_menu('SHOP_MENU');
})

// OPEN INVENTORY
open_inv_button.addEventListener("click", function() {
    switch_to_menu('INVENTORY_MENU');
})

// OPEN STORAGES
open_storages_button.addEventListener("click", function() {
    switch_to_menu('STORAGE_MENU');
})

// OPEN INCOME MENU
open_income_button.addEventListener("click", function() {
    switch_to_menu('INCOME_MENU');
})

// switches menus
function switch_to_menu(menu_name) {
    menu_list[current_menu].style.display = 'none';
    menu_list[menu_name].style.display = 'block';
    current_menu = menu_name;
}

reset_shop_button.addEventListener('click', refresh_shop);


let displayed_item_info = [];  // text elements for each shop entry
let disp_i_i_values = [];  // actual values for those text elements
let displayed_buttons = [];  // button elements for each shop entry
function refresh_shop() {
    var shop_size = Object.keys(shop_items).length; // number of items in shop
    shop_items.length = 0 // clear existing shop

    for (let i = 0; i < 10; i++) {

        let item_name = valid_items_arr[Math.floor(Math.random() * valid_items_arr.length)];

        let MAX = 20; // max number of one shop slot (excl)
        let MIN = 1;
        let random_count = Math.floor(Math.random() * (MAX - MIN) + MIN); // The maximum is exclusive and the minimum is inclusive

        shop_items.push([item_name, valid_items_values[item_name], random_count]);
    }

    // maybe merge these two for loops, and add prefixes like cost: and count: to the shop display


    let shop_div = document.getElementById('shop_menu');

    // clear the old items
    for (let line = 0; line < displayed_item_info.length; line++) {
        for (let e = 0; e < displayed_item_info[line].length; e++) {
            displayed_item_info[line][e].remove(); // remove all text elements

        }
        displayed_buttons[line].remove(); // remove all button elements
    }
    // these deletions must be done outside for loop
    displayed_buttons.length = 0;
    displayed_item_info.length = 0;
    disp_i_i_values.length = 0;

    for (const c in shop_items) {

        let item = shop_items[c]; // name, cost, amount
        let name = item[0];
        let cost = item[1];
        let count = item[2];

        let nl = document.createElement('br')
        let shop_item_info = document.createElement('h4')
        shop_item_info.innerHTML = name + ', $' + String(cost) + ', ' + String(count) + ' available';
        let spacing = document.createElement('h4');
        spacing.innerHTML = '\u00A0\u00A0\u00A0';
        let btn = document.createElement("button");

        nl.setAttribute('id', 'shop_entry_nl' + String(displayed_item_info.length));
        shop_item_info.setAttribute('id', 'shop_entry_sii' + String(displayed_item_info.length));
        shop_item_info.setAttribute('style', 'display: inline-block; margin: 0;');
        spacing.setAttribute('id', 'shop_entry_sp' + String(displayed_item_info.length));
        spacing.setAttribute('style', 'display: inline-block; margin: 0;');
        btn.setAttribute('id', 'shop_entry_btn' + String(displayed_item_info.length));
        btn.innerHTML = "Buy";


        shop_div.append(nl)  // newline
        shop_div.append(shop_item_info);  // name, cost, count
        shop_div.appendChild(spacing)  // space btwn item info and button

        shop_div.append(btn);  // buy button

        displayed_item_info.push([nl, shop_item_info, spacing]);
        disp_i_i_values.push([cost, count]);
        displayed_buttons.push(btn);

        btn.addEventListener('click', function() {
            if (cost <= balance) {
                update_balance(balance - cost);
                // document.getElementById('shop_entry_sii' + String(displayed_item_info.length - 1)).innerHTML = name + ', $' + String(cost) + ', ' + String(count - 1) + ' available ';
                let correct_btn = (d) => d.isEqualNode(btn);  // apparently findIndex() takes a function, so this finds the element that is equal to this button
                let index = displayed_buttons.findIndex(correct_btn);
                disp_i_i_values[index][1] -= 1
                let lowered_count = disp_i_i_values[index][1]
                shop_item_info.innerHTML = name + ', $' + String(cost) + ', ' + String(lowered_count) + ' available';

                // now add our purchased items to the inventory
                if (name in inventory) {
                    // remember inventory[name][0] is the current count
                    update_inventory_item(name, inventory[name][0] + 1);
                } else {
                    let new_entry = document.createElement('new_entry' + String(Object.keys(inventory).length));  // element for displaying each item type in inventory
                    let newline = document.createElement('br');
                    inventory[name] = [1, [newline, new_entry]];
                    document.getElementById('inventory_menu').appendChild(newline);
                    document.getElementById('inventory_menu').appendChild(new_entry);
                }

                if (lowered_count == 0) { // aka sold out
                    // first, remove the elements from the document
                    for (let j = 0; j < displayed_item_info[index].length; j++) {
                        // gotta remove these 1 by 1, since each array element is a list of elements
                        displayed_item_info[index][j].remove();
                    }
                    displayed_buttons[index].remove();

                    // then remove those element references from the arrays
                    displayed_item_info.splice(index, 1);
                    displayed_buttons.splice(index, 1);
                    disp_i_i_values.splice(index, 1);
                }
            }
        })
    }
}

function buy_from_shop() {
    // need to add event listeners to each button in <displayed_buttons>
}

function update_inventory_item(item_name, new_count) {
    inventory[item_name][0] = new_count;
    inventory[item_name][1][1].innerHTML = item_name + ' ' + String(inventory[item_name][0])
}

function show_inventory() {
    let inventory_div = document.getElementById('inventory_menu');
}

function update_balance(new_balance) {
    document.getElementById('balance').innerHTML = String(new_balance);
    balance = new_balance;
}









refresh_shop();










console.log('script.js execution finished')