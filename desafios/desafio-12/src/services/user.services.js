import UserManager from '../persistence/daos/mongodb/user.manager.js'
import { UserModel } from "../persistence/daos/mongodb/models/user.model.js";
import { createHash, validatePassword } from '../utils.js';
import config from '../config.js';
import { sendMail } from './mailing.service.js';
import jwt from 'jsonwebtoken';

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
        await sendMail(user, 'register');
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

const generateToken = (user, time = '5m') => {
    const payload = { userId: user._id};
    return jwt.sign(payload, config.SECRET_KEY_JWT, { expiresIn: time});
}

export const generateResetPass = async (user) => {
    try {
        return generateToken(user, '1h');
    } catch (error) {
        throw new Error(error);
    }
}

export const updatePass = async (pass, user) => {
    try {
        const isEqual = validatePassword(pass, user);
        if(isEqual) return null;
        const newPass = createHash(pass);
        return await userDao.update(user._id, {password: newPass});
    } catch (error) {
        throw new Error(error);
    }
}