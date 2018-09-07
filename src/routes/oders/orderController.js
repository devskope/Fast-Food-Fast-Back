import Order from '../../models/orders';
import checkRequired from '../../helpers/order_field_helpers';

/*
 * TODO: createOrder should return price in res
 */
const createOrder = (req, res) => {
  const { category, name, qty, ...extras } = req.body;

  checkRequired(req, res);

  const newOrder = new Order({ category, name, qty, extras });
  newOrder.save();

  res.status(201).json({
    success: true,
    message: `Order created successfully`,
    data: newOrder
  });
};

export default { createOrder };
