import mysql = require('mysql');

export default class MySQL {
  private static _instance: MySQL;

  // cnn = connection.
  cnn: mysql.Connection;
  connect: Boolean = false;

  constructor() {
    console.log('Class initialized');

    this.cnn = mysql.createConnection({
      host: 'localhost',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      port: 3307,
    });

    this.connectDB();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  static runQuery(query: string, callback: Function) {
    this.instance.cnn.query(
      query,
      (err: mysql.MysqlError | null, results: Object[], fields: mysql.FieldInfo[] | undefined) => {
        if (err) {
          console.log('An Error here!', err);
          return callback(err);
        }

        if (results.length === 0) {
          callback('Register not found');
        } else {
          callback(null, results);
        }
      }
    );
  }

  private connectDB() {
    this.cnn.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log('An Error here Elis:', err.message);
        return;
      }

      this.connect = true;
      console.log('DataBase Online Elis');
    });
  }
}
