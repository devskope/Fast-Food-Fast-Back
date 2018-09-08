import orders from '../datastores/orderData';

class Order {
  constructor({ name, qty = 1, category, ...extras }) {
    this.name = name;
    this.category = category;
    this.status = 'pending';
    this.qty = qty;

    if (this.category === 'pizza') {
      this.topping = { ...extras }.topping || `pepperoni`;
    }
  }

  save() {
    orders.add(this);
  }
}

export default Order;
