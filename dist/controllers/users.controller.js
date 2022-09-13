"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _usersService = _interopRequireDefault(require("../services/users.service"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let UsersController = class UsersController {
    constructor(){
        this.userService = new _usersService.default();
        this.getUsers = async (req, res, next)=>{
            try {
                const findAllUsersData = await this.userService.findAllUser();
                res.status(200).json({
                    data: findAllUsersData,
                    message: 'findAll'
                });
            } catch (error) {
                next(error);
            }
        };
        this.getUserById = async (req, res, next)=>{
            try {
                const userId = Number(req.params.id);
                const findOneUserData = await this.userService.findUserById(userId);
                res.status(200).json({
                    data: findOneUserData,
                    message: 'findOne'
                });
            } catch (error) {
                next(error);
            }
        };
        this.createUser = async (req, res, next)=>{
            try {
                const userData = req.body;
                const createUserData = await this.userService.createUser(userData);
                res.status(201).json({
                    data: createUserData,
                    message: 'created'
                });
            } catch (error) {
                next(error);
            }
        };
        this.updateUser = async (req, res, next)=>{
            try {
                const userId = Number(req.params.id);
                const userData = req.body;
                const updateUserData = await this.userService.updateUser(userId, userData);
                res.status(200).json({
                    data: updateUserData,
                    message: 'updated'
                });
            } catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next)=>{
            try {
                const userId = Number(req.params.id);
                const deleteUserData = await this.userService.deleteUser(userId);
                res.status(200).json({
                    data: deleteUserData,
                    message: 'deleted'
                });
            } catch (error) {
                next(error);
            }
        };
    }
};
const _default = UsersController;

//# sourceMappingURL=users.controller.js.map