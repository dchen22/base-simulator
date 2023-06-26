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

    for (const c in shop_items) {

        let item = shop_items[c]; // name, cost, amount
        let name = item[0];
        let cost = String(item[1]);
        let count = String(item[2]);

        let nl = document.createElement('br')
        let shop_item_info = document.createTextNode(name + ', $' + cost + ', ' + count + ' available ');
        let spacing = document.createTextNode('\u00A0\u00A0\u00A0')
        let btn = document.createElement("button");
        btn.innerHTML = "Buy";


        shop_div.appendChild(nl)  // newline
        shop_div.appendChild(shop_item_info);  // name, cost, count
        shop_div.appendChild(spacing)  // space btwn item info and button

        shop_div.appendChild(btn);  // buy button

        displayed_item_info.push([nl, shop_item_info, spacing]);
        displayed_buttons.push(btn);
    }
};










refresh_shop();










console.log('script.js execution finished')