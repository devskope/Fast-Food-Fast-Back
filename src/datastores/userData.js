export class UserStore extends Array {
  findByProp(prop) {
    return this.find(x => x[prop]);
  }

  findByUsername(username) {
    return this.find(x => x.username === username);
  }

  add(newUser) {
    newUser.id = this.length + 1; // eslint-disable-line no-param-reassign
    this.push(newUser);
  }
}

export const users = new UserStore();

export const user = { anonymous: true };
