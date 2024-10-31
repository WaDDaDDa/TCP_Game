import { updateUserLocation } from "../db/user/user.db.js";
import { userSessions } from "./session.js";

export const addUser = (user) => {
  userSessions.push(user);
  return user;
};

export const removeUser = async (socket) => {
  const index = userSessions.findIndex((user) => socket === user.socket);
  if (index !== -1) {
    const user = userSessions[index];
    await updateUserLocation(user.x, user.y, user.id);
    return userSessions.splice(index, 1)[0];
  }
};

export const getAllUser = () => {
  return userSessions;
};
