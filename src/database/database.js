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

// const types = {
//   true: "revenue",
//   false: "expenditure",
// };

export let transaction = {
  transactions: [
    {
      tranID: 1,
      userID: 1,
      tranDate: "4/19/2021",
      tranNote: "ซื้อแกงไตปลา",
      tranType: true,
      tranAmount: 40,
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

  async checkExistingUser(username) {
    //console.log(username);
    return user.users.findIndex((item) => item.username === username);
  }

  async isValidUser(username, password) {
    //console.log("isValidUser", username, password);
    const index = user.users.findIndex((item) => item.username === username);
    //console.log(index);
    if( index === -1) {
      return false
    }
    return await bcrypt.compare(password, user.users[index].password);
  }

  createTransaction = async (
    userID,
    tranDate,
    tranNote,
    tranType,
    tranAmount
  ) => {
    const newId = await this.genarateTransactionID();
    //console.log(newId);
    const newData = {
      userID: userID,
      tranDate: tranDate,
      tranNote: tranNote,
      tranType: tranType,
      tranAmount: tranAmount,
      tranID: newId,
    };
    await transaction.transactions.push(newData);
    return transaction.transactions[transaction.transactions.length - 1];
  };

  async getAllTransaction() {
    return transaction.transactions;
  }

  async genarateTransactionID() {
    const max = Math.max.apply(
      Math,
      transaction.transactions.map(function (o) {
        return +o.tranID;
      })
    );
    return max + 1;
  }

  async findTransaction(data) {
    const { userID, tranDate, tranNote, tranType, tranAmount, tranID } = data;
    const result = await transaction.transactions.find(
      (item) => item.tranID === tranID
    );
    let newData = {
      userID: userID,
      tranDate: tranDate,
      tranNote: tranNote,
      tranType: tranType,
      tranAmount: tranAmount,
      tranID: tranID,
    };

    const returnedTarget = Object.assign(result, newData);

    //console.log(transaction.transactions[tranID]);

    //console.log(returnedTarget);

    //console.log(result);
    return result;
  }
}
