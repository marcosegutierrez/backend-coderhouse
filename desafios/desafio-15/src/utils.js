import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const validatePassword = (password, user) => {
    return bcrypt.compareSync(password, user.password);
}