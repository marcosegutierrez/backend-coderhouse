import UserManager from '../persistence/daos/mongodb/user.manager.js'
import { UserModel } from "../persistence/daos/mongodb/models/user.model.js";
import { createHash, validatePassword } from '../utils.js';
import config from '../config.js';

const userDao = new UserManager(UserModel);

export const login = async (req) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.getUser(email)
        if (!user) return null;
        if (validatePassword(password, user)) {
            return user;
        } else return null
    } catch (error) {
    throw new Error(error);
}
}

export const register = async (user) => {
    try {
        const { password } = user;
        return await userDao.register({
            ...user,
            password: createHash(password)
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const getUser = async (email) => {
    try {
        return await userDao.getUser(email);
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserById = async (id) => {
    try {
        return await userDao.getUserById(id);
    } catch (error) {
        throw new Error(error);
    }
}