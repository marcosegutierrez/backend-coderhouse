import * as services from '../services/user.services.js';

export const login = async (req, res) => {
  try {
    const user = await services.login(req);
    if (user) res.redirect('/api/products');
    else res.status(401).json({ msg: "No estas autorizado" });
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (req, res) => {
  try {
    const user = await services.register(req.body);
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

export const registerResponse = (req, res, next) => {
  try {
    res.redirect('/login-local');
  } catch (error) {
    next(error);
  }
};

export const loginResponse = async (req, res, next) => {
  try {
    let id = null;
    if (req.session.passport && req.session.passport.user) id = req.session.passport.user;
    const user = await services.getUserById(id);
    if (!user) res.status(401).json({ msg: 'Error de autenticacion' });
    else res.redirect('/api/products');
  } catch (error) {
    next(error);
  }
};

export const githubResponse = async (req, res, next) => {
  try {
    const user = await services.getUserById(req.user._id);
    const { first_name, last_name, email, role } = req.user;
    req.session.email = email;
    req.session.first_name = first_name;
    req.session.last_name = last_name;
    req.session.role = role;
    res.redirect('/api/products');
  } catch (error) {
    next(error)
  }
}