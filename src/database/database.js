import bcrypt from "bcrypt";
export let user = {
  users: [
    {
      id: 1,
      username: "frame",
      password: "$2b$10$m03Rv28QeXo480gEOPEYoOL/0Nh0P7z/kCptGYdH2JLd6UwpGxrGK",
      email: "teeraphat123@hotmail.com",
    },
  ],
};

const types = {
  REVENUE: "revenue",
  EXPENDITURE: "expenditure"
}


export let transaction = {
  transactions: [
    {
      userID: 1,
      tranDate: "4/19/2021",
      tranNote: "ซื้อแกงไตปลา",
      tranType: types.EXPENDITURE,
      tranAmount: 40
    }
  ]
}

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

  async checkExistingUser(username) {
    console.log(username);
    return user.users.findIndex((item) => item.username === username);
  }

  async isValidUser(username, password) {
    console.log("isValidUser", username, password);
    const index = user.users.findIndex((item) => item.username === username);
    console.log(index);
    return await bcrypt.compare(password, user.users[index].password);
  }

   createTransaction = async (userID, tranDate, tranNote, tranType, tranAmount) => {
     console.log(userID, tranDate, tranNote, tranType, tranAmount)
     const newData = {
      userID: userID, 
      tranDate: tranDate, 
      tranNote: tranNote, 
      tranType: tranType, 
      tranAmount:tranAmount
    };
     await transaction.transactions.push(newData)
     return transaction.transactions[transaction.transactions.length-1]
   }
}
