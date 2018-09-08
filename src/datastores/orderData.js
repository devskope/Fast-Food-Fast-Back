class OrderStore extends Array {
  findByProp(prop) {
    return this.find(x => x[prop] === prop);
  }

  add(newOrder) {
    newOrder.id = this.length + 1; // eslint-disable-line no-param-reassign
    this.push(newOrder);
  }
}

const orders = new OrderStore();

export default orders;
