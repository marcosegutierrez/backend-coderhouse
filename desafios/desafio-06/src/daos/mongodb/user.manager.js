export default class UserManager {
    constructor(model){
        this.model = model;
    }

    async register(user){
        try {
            const { email } = user;
            const existUser = await this.model.findOne({ email });
            if(!existUser) return await this.model.create(user);
            else return null;
        } catch (error) {
            throw new Error(error)
        }
    };

    async login(email, password){
        try {
            return await this.model.findOne({ email, password });
        } catch (error) {
            throw new Error(error)
        }
    };
}