import userRouter from './users/index';
import orderRouter from './orders/index';
import adminRouter from './admin/index';

export const ROOT_URL = `/api/v1`;

const router = app => {
  app.use(`${ROOT_URL}/users`, userRouter);
  app.use(`${ROOT_URL}/orders`, orderRouter);
  app.use(`${ROOT_URL}`, (req, res) => {
    res.send(`
    
    <p><a href="https://travis-ci.org/ope-oguntoye/Fast-Food-Fast-Back"><img src="https://travis-ci.org/ope-oguntoye/Fast-Food-Fast-Back.svg?branch=develop"
      alt="Build Status"></a> &nbsp; &nbsp; &nbsp; <a href="https://codecov.io/gh/ope-oguntoye/Fast-Food-Fast-Back"><img
      src="https://codecov.io/gh/ope-oguntoye/Fast-Food-Fast-Back/branch/develop/graph/badge.svg" alt="codecov"></a></p>
<p><code>ROOT_URL = https://fast-food-fast-server.herokuapp.com/api/v1</code></p>
<h1 id="users">USERS</h1>
<table>
  <thead>
    <tr>
      <th>METHOD</th>
      <th>ROUTE</th>
      <th>DESC</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td><code>$ROOT_URL/users/register</code></td>
      <td>Register user</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>$ROOT_URL/users/login</code></td>
      <td>Login user</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>$ROOT_URL/users/register</code></td>
      <td>Redirect if logged in</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>$ROOT_URL/users/login</code></td>
      <td>Redirect if logged in</td>
    </tr>
  </tbody>
</table>
<h1 id="orders">ORDERS</h1>
<table>
  <thead>
    <tr>
      <th>METHOD</th>
      <th>ROUTE</th>
      <th>DESC</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td><code>$ROOT_URL/orders</code></td>
      <td>Create Order</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>$ROOT_URL/orders</code></td>
      <td>Fetch all Orders</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>$ROOT_URL/orders/:id</code></td>
      <td>Fetch order by id</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td><code>$ROOT_URL/orders/:id</code></td>
      <td>Update single order status</td>
    </tr>
  </tbody>
</table>
<h1 id="sample-requests">SAMPLE REQUESTS</h1>
<h2 id="user">USER</h2>
<h2 id="reg-login-"><em>Reg -&gt; Login:</em></h2>
<pre><code class="lang-javascript">{
  username: uname,
  password: pass,
  email: email    // optional on reg, absent onLogin
}
</code></pre>
<h2 id="orders">ORDERS</h2>
<h2 id="creation-"><em>Creation:</em></h2>
<pre><code class="lang-javascript"> /*
  * Order id, status added onsave
  *
 */
{
  category: category,  // maybe pizza :)
  name: name,         // what kind of pizza
  qty: qty,          // a thousand please!
  ...extras            //  obj, ex. { topping: &#39;hotsauce&#39;, ...x}
}
</code></pre>
<h2 id="updating-"><em>Updating:</em></h2>
<pre><code class="lang-javascript">{
  status: &#39;completed&#39; || &#39;declined&#39; || &#39;confirmed&#39;
}
</code>
<p> TODO:
- [x] user tests
- [x] user registration
- [x] user login
- [x] order tests
- [x] order creation
- [x] order fetching
- [x] order fetching (by id)
- [x] order update
- [ ] admin user implementation
- [ ] restrict order update route to only admin
- [ ] ...extras</p>
</pre>
    `);
  });
  app.use(`/super`, adminRouter);
};

export default router;
