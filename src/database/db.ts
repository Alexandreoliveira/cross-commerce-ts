import { Logger } from "../logger";
import { Connection, createConnection } from "typeorm";

export class Database {

  public connection: Connection;
  private static database: Database;

  public static instance(): Database {
    if (!this.database) {
      this.database = new this()
      this.database.connectToDB();
    }
    return this.database;
  }

  private connectToDB(): void {
    createConnection({
      type: "mariadb",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "challenge_cross",
      
      entities: [
        __dirname + "/entity/*.ts",
        __dirname + "/entity/*.js"
      ],
      synchronize: false,
      logging: false
    }).then(_con => {
      this.connection = _con;
      Logger.instance().print("Connected to db!!");
    }).catch(console.error)
  }
}
