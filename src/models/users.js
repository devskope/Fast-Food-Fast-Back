import { users } from '../datastores/userData';

class User {
  constructor({ username, password, email = '' }) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  save() {
    users.add(this);
  }
}

const superUser = new User({
  username: 'admin',
  password: '$2a$10$4DhhXb8vXCMh/Xf1p3VuzeFdBqzJJkCwwhTXE55PLpYrkeuNQQci6',
  email: 'max@fff.chow'
});
superUser.isAdmin = true;
superUser.save();

export default User;
