class Database {
  #url;
  #port;
  #username;
  #password;
  #tables;
  constructor(url, port, username, password) {
    this.#url = url;
    this.#port = port;
    this.#username = username;
    this.#password = password;
    this.#tables = [];
  }

  createNewTable(table) {
    this.tables.push(table);
  }

  clearTables(table) {
    this.#tables.pop();
  }

  get url() {
    return this.#url;
  }
  get port() {
    return this.#port;
  }

  get username() {
    return this.#username;
  }

  get password() {
    return this.#password;
  }
  get tables() {
    return this.#tables;
  }
}

const data = new Database(1, 2, 3, 4);

data.createNewTable({ name: 'roles' });
data.createNewTable({ name: 'users' });

data.clearTables();
// console.log('Databse:', data);
