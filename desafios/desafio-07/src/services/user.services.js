import UserManager from '../daos/mongodb/user.manager.js'
import { UserModel } from "../daos/mongodb/models/user.model.js";
import { createHash, validatePassword } from '../utils.js';

const userDao = new UserManager(UserModel);

export const login = async (req) => {
    try {
        const {email, password} = req.body;
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            req.session.email = email;
            req.session.first_name = 'Admin';
            req.session.last_name = 'Coderhouse';
            req.session.role = 'admin';
            return 1;
        } else {
            const user = await userDao.getUser(email)
            if (!user) return null;
            if (validatePassword(password, user)) {
                req.session.email = email;
                req.session.password = user.password;
                req.session.first_name = user.first_name;
                req.session.last_name = user.last_name;
                req.session.role = user.role;
                return user;
            } else return null
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const register = async (user) => {
    try {
        const {password} = user;
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