import TicketService from "../services/ticket.service.js";
import UserManager from "../persistence/daos/mongodb/user.manager.js";
import { UserModel } from "../persistence/daos/mongodb/models/user.model.js";

const ticketService = new TicketService();
const userDao = new UserManager(UserModel);

export default class TicketController {

  async generateTicket(req, res, next) {
    try {
      const user = await userDao.getUser(req.session.email);
      const ticket = await ticketService.generateTicket(user);
      if(!ticket) res.status(404).json({msg: 'Error generate ticket'})
      else res.status(200).json({ticket});
    } catch (error) {
      next(error);
    }
  }
}
