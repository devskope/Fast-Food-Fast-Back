import Order from '../../models/orders';

const createOrder = (req, res) => {
  const { category, name, qty, ...extras } = req.body;
  const newOrder = new Order({ category, name, qty, ...extras });
  newOrder.save().then(order => {
    res.status(201).json({
      success: true,
      message: `Order created successfully`,
      order
    });
  });
};

const getOrders = (req, res) => {
  Order.getAllOrders().then(orders => {
    if (orders.length === 0) {
      res.status(200).json({
        success: true,
        message: `no orders created yet`,
        orders: []
      });
    } else {
      res.status(200).json({
        success: true,
        message: `fetched order list successfully`,
        orders
      });
    }
  });
};

const getSingleOrder = (req, res) => {
  const { id } = req.params;
  Order.getOrderByID(id).then(order => {
    if (order) {
      res.status(200).json({
        success: true,
        message: `order found`,
        order
      });
    } else {
      res.status(404).json({
        success: false,
        message: `no order found`
      });
    }
  });
};

const updateOrder = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const orderStates = ['completed', 'confirmed', 'declined'];

  Order.getOrderByID(id)
    .then(order => {
      if (!orderStates.includes(status)) {
        res.status(500).json({
          success: false,
          message: `cannot parse invalid status "${status}"`
        });
      } else {
        Order.updateStatus(order.id, status).then(updatedOrder => {
          res.status(200).json({
            success: true,
            message: `order #${id} has been marked as ${status}`,
            order: updatedOrder
          });
        });
      }
    })
    .catch(() => {
      res.status(404).json({
        success: false,
        message: `order #${id} not found`
      });
    });
};

export default { createOrder, getOrders, getSingleOrder, updateOrder };
