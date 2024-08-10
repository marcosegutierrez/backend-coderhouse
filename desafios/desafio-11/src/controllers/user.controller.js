import * as services from '../services/user.services.js';
import { HttpResponse } from '../utils/http.response.js';
import { logger } from '../utils/logger.js';

const httpResponse = new HttpResponse();

export const logout = (req, res) => {
  req.session.destroy();
  logger.info('Session destroy!');
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
    if (!user) return httpResponse.Unauthorized(res, { msg: 'Error de autenticacion' });
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
    if (!user) return httpResponse.Unauthorized(res, { msg: 'Error de autenticacion' });
    else {
      sessionUser(req, user);
      return httpResponse.Ok(res, { msg: "Autenticado correctamente" });
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