export const checkAdmin = async (req, res, next) => {
  try {
    const { role } = req.session;
    if (role !== "admin") {
      res.status(401).json({"msg": "Este endpoint es para usuarios administradores"});
    } else next();
  } catch (error) {
    next(error);
  }
};
