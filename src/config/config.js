// 모든 상수, 환경변수들은 config객체를 통해서만 사용되어야 한다.
import {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} from "../constants/env.js";

export const config = {
  database: {
    database: DB_NAME,
    host: DB_HOST,
    password: DB_PASSWORD,
    port: DB_PORT,
    user: DB_USER,
  },
};
