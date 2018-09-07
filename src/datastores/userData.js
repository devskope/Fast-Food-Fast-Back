export class UserStore extends Array {
  findByUsername(username) {
    return this.find(x => x.username === username);
  }

  add(newUser) {
    newUser.id = this.length + 1; // eslint-disable-line no-param-reassign
    this.push(newUser);
  }
}

const users = new UserStore();

export default users;
