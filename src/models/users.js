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

  set setPassword(password) {
    this.password = password;
  }

  get getUsername() {
    return this.username;
  }

  set setUsername(username) {
    this.username = username;
  }
}

export default User;
