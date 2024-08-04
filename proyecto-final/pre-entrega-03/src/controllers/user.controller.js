import * as services from '../services/user.services.js';

export const logout = (req, res) => {
  req.session.destroy();
  console.log('Session destroy!');
  res.redirect("/login");
};

export const registerResponse = (req, res, next) => {
  try {
    res.redirect('/login');
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
    else {
      sessionUser(req, user);
      res.redirect('/api/products');
    }
  } catch (error) {
    next(error);
  }
};

export const loginResponseApiClient = async (req, res, next) => {
  try {
    let id = null;
    if (req.session.passport && req.session.passport.user) id = req.session.passport.user;
    const user = await services.getUserById(id);
    if (!user) res.status(401).json({ msg: 'Error de autenticacion' });
    else {
      sessionUser(req, user);
      res.status(200).json({ msg: "Autenticado correctamente" });
    }
  } catch (error) {
    next(error);
  }
};

export const githubResponse = async (req, res, next) => {
  try {
    const user = await services.getUserById(req.user._id);
    sessionUser(req, req.user);
    res.redirect('/api/products');
  } catch (error) {
    next(error)
  }
}

const sessionUser = (req, user) => {
  const { first_name, last_name, role, email } = user;
  req.session.email = email;
  req.session.first_name = first_name;
  req.session.last_name = last_name;
  req.session.role = role;
  req.session.cartId = user.cart._id.toString();
}