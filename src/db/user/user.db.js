import { v4 as uuidv4 } from "uuid";
import { USER_QURIES } from "./user.queries.js";
import { toCamelCase } from "../../utils/transformCase.js";
import dbPool from "../database.js";

// 에러핸들링 추가

export const findUserByDeviceID = async (deviceId) => {
  const [rows] = await dbPool.query(USER_QURIES.FIND_USER_BY_DEVICE_ID, [
    deviceId,
  ]);
  return toCamelCase(rows[0]);
};

export const createUser = async (deviceId) => {
  //const id = uuidv4();
  await dbPool.query(USER_QURIES.CREATE_USER, [deviceId]);
  return { deviceId };
};

export const updateUserLogin = async (deviceId) => {
  await dbPool.query(USER_QURIES.UPDATE_USER_LOGIN, [deviceId]);
};

export const updateUserLocation = async (x, y, deviceId) => {
  await dbPool.query(USER_QURIES.UPDATE_USER_LOCATION, [x, y, deviceId]);
};
