import UserManager from '../daos/mongodb/user.manager.js'
import { UserModel } from "../daos/mongodb/models/user.model.js";
const userDao = new UserManager(UserModel);

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      req.session.email = email;
      req.session.first_name = 'Admin';
      req.session.last_name = 'Coderhouse';
      req.session.role = 'admin';
      res.redirect('/api/products');
    } else {
      const user = await userDao.login(email, password);
      if (!user) res.status(401).json({ msg: "No estas autorizado" });
      else {
        req.session.email = email;
        req.session.password = password;
        req.session.first_name = user.first_name;
        req.session.last_name = user.last_name;
        req.session.role = user.role;
        res.redirect('/api/products');
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (req, res) => {
  try {
    const user = await userDao.register(req.body);
    if (!user) res.status(401).json({ msg: "user exist!" });
    else res.redirect("/login");
  } catch (error) {
    throw new Error(error);
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  console.log('Session destroy!');
  res.redirect("/login");
};
