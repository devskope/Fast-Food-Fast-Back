class MenuList extends Array {
  /*
  * add a new item to the menu
   * 
  */
  add(newItem) {
    this.push(newItem);
  }

  /*
   * get menu menu
   *
   * return menu items merged into categories  
  */

  get list() {
    /*
     * form an object with unique category names and count
     * 
    */

    const key = [...new Set(this.map(({ category }) => category))]
      .map(cat =>
        Object.assign({
          [cat]: this.filter(({ category }) => category === cat).length
        })
      )
      .reduce((acc, v) => Object.assign(acc, v), {}); // form an object for convenience

    /* 
      *
      * 
      *  
    */

    const res = Object.keys(key) // for each category
      .reduce(
        (acc, cat) =>
          key[cat] === 1 // if not multiple
            ? acc.concat(this.filter(({ category }) => category === cat)) // add the element
            : acc.concat(
                Object.assign({
                  category: cat,
                  varietyCount: this.filter(({ category }) => category === cat)
                    .length,
                  varaieties: this.filter(({ category }) => category === cat)
                })
              ),
        []
      );
    return res;
  }

  findByCat(category) {
    return this.find(x => x.category === category);
  }
}

const menu = new MenuList(
  {
    category: 'pizza',
    name: 'extra Hot',
    price: 3000
  },

  {
    category: 'pizza',
    name: 'crusty pizza',
    price: 3000
  },

  {
    category: 'pizza',
    name: 'creamy crust',
    price: 3000
  },

  {
    category: 'chicken',
    name: 'flayed fillet',
    price: 3000
  },

  {
    category: 'chicken',
    name: 'lol bunyon',
    price: 3000
  }
);

export default menu;
