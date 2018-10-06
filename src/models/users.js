import debug from 'debug';
import db from '../datastores/index';
import saveHelper from '../helpers/user_model_helpers';

const logger = debug('fff:user-db');
logger(`db connector....`);

class User {
  constructor({ username, password, email = null }) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  async save(role = 1) {
    let user;

    const saveAdmin = async () => {
      const dbString = [
        'INSERT INTO f3.users(username, password, email, is_admin) VALUES($1, $2, $3, $4) RETURNING *',
        [this.username, this.password, this.email, (this.isAdmin = true)]
      ];
      const res = await saveHelper(db, dbString, 'Admin', logger);
      return res;
    };

    const saveUser = async () => {
      const dbString = [
        `INSERT INTO f3.users(username, password, email, is_admin) VALUES($1, $2, $3, $4) RETURNING *`,
        [this.username, this.password, this.email, (this.isAdmin = false)]
      ];
      const res = await saveHelper(db, dbString, 'User', logger);
      return res;
    };

    role === 0 ? (user = await saveAdmin()) : (user = saveUser()); // eslint-disable-line

    return user;
  }

  static async findByUsername(username) {
    let user;
    const [query, params] = [
      `SELECT * FROM f3.users WHERE username = $1`,
      [username]
    ];
    try {
      const { rows } = await db.query(query, params);
      [user] = rows;
    } catch ({ message }) {
      logger(message);
    }
    return user;
  }
}

export default User;
