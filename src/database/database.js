import bcrypt from "bcrypt";

let user = {
  users: [
    {
      id: 1,
      username: "frame",
      password: "11111",
      email: "teeraphat123@hotmail.com",
    },
  ],
};

export class Database {
  async findOne(where) {
    const { username, email } = where;
    const result = await user.users.find(
      (item) => item.username === username || item.email === email
    );
    return result;
  }

  async getAllUser() {
    return user.users;
  }

  async genarateID() {
    const max = Math.max.apply(
      Math,
      user.users.map(function (o) {
        return +o.id;
      })
    );
    return max + 1;
  }

  async create(data) {
    const newId = await this.genarateID();
    const newData = {
      ...data,
      id: newId,
    };
    await user.users.push(newData);
    return user.users[user.users.length - 1];
  }
}
