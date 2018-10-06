import debug from 'debug';
import db from '../datastores/index';

const logger = debug('fff:order-db');
logger(`db connector....`);

class Order {
  constructor({ name, qty = 1, category, ...extras }) {
    this.name = name;
    this.category = category;
    this.qty = qty;
    this.status = 'pending';
    this.owner = 'owner';

    if (this.category === 'pizza') {
      this.topping = { ...extras }.topping || `pepperoni`;
    }
  }

  async save() {
    const [query, params] = [
      `INSERT INTO f3.orders(
        name,
        category,
        qty,
        status,
        topping,
        owner
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        this.name,
        this.category,
        this.qty,
        this.status,
        this.topping,
        this.owner
      ]
    ];
    const { rows } = await db.query(query, params);
    return rows[0];
  }

  static async updateStatus(id, status) {
    const [query, params] = [
      `UPDATE f3.orders SET status = $1 WHERE id = $2 returning *`,
      [status, id]
    ];
    const { rows } = await db.query(query, params);
    return rows[0];
  }

  static async getAllOrders() {
    const query = `SELECT * FROM f3.orders`;
    const { rows } = await db.query(query);
    return rows;
  }

  static async getOrderByID(id) {
    const [query, params] = [`SELECT * FROM f3.orders WHERE id = $1`, [id]];
    const { rows } = await db.query(query, params);
    return rows[0];
  }
}

export default Order;
