import { ConnectionOptions } from "typeorm";

const defaultConnectOptions: ConnectionOptions = {
  type: "mysql",
  database: "boilerplate",
  synchronize: false,
  // 모든 로깅을 보게된다.
  logging: true,
  migrationsTableName: "migration_table",
  migrations: ["src/migrations/*.*"],
  entities: ["src/entities/*.*"],
  cli: {
    migrationsDir: 'src/migrations'
  },
  host: process.env.DB_ENDPOINT || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || ""
};

export = defaultConnectOptions;
