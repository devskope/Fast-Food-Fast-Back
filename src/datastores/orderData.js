class OrderStore extends Array {
  findById(id) {
    return this.find(x => x.id === id);
  }

  add(newOrder) {
    newOrder.id = this.length + 1; // eslint-disable-line no-param-reassign
    this.push(newOrder);
  }
}

const orders = new OrderStore();

export default orders;
