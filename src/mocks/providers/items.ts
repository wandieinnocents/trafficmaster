import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "road": "Jinja Road",
    "profilePic": "assets/img/user.png",
    "population": "Heavy.",
    "description": "There is heavy traffic between kyambogo to round about",
    "direction": "going",
  };


  constructor() {
    let items = [
      {
        "road": "Jinja Road",
        "profilePic": "assets/img/user.png",
        "population": "too_much",
        "description": "There is heavy traffic between kyambogo to round about",
        "from": "Spear",
        "direction": "Going to town",
      },
      
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
