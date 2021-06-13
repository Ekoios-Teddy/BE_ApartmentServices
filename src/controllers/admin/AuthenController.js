const { ErrorCode } = require('../../constants');
const { UserService } = require('../../services');
const { ComparePass } = require('../../utils/crypto');
const { verifyToken, signToken } = require("../../utils/jwt");
const { Validation } = require('../../utils');
const { ObjectId } = require('mongodb');

async function _login(req, res, next) {
    const { username, password } = req.body;
    let user = await UserService._getUserByUsername(username);
    if (user && user.isHidden == false && Validation.check_Password(password)) {
        // const hasMatch = await ComparePass(password, user.password);
        console.log('user', user)
        if (password === user.password) {
            const data = {
                _id: user._id,
                role: user.role,
                username: user.username,
                login_at: Date.now()
            }
            const response = await signToken(data);
            return ErrorCode.ErrorCode200(res, { access_token: response })
        } else {
            return ErrorCode.ErrorCodeResponse(res, 401, "Username or password not right", null)
        }
    } else {
        return ErrorCode.ErrorCodeResponse(res, 401, "Username does not exist", null);
    }
};

async function _checkAuthen(req, res, next) {
    const token = req.header("access_token");
    console.log('token', token)
    if (token) {
        try {
            const data = await verifyToken(token);
            if (!data) return ErrorCode.ErrorCodeResponse(res, 401, "Can not read Access-token", null);
            req.user = data;
            next();
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCodeResponse(res, 401, "Please check again information fields sended", null)
    }
};

async function _checkPermissionAdmin(req, res, next) {
    const user = req.user;
    if (user.role !== 2048) return ErrorCode.ErrorCodeResponse(res, 401, "Your account do not have permission to access!");
    next();
};

async function _checkPermissionEmployees(req, res, next) {
    const user = req.user;
    if (user.role !== 1024 && user.role !== 2048) return ErrorCode.ErrorCodeResponse(res, 401, "Your account do not have permission to access!");
    next();
};

async function _checkPermissionResident(req, res, next) {
    const user = req.user;
    const userID = req.params["userID"];
    console.log('user', user._id == userID)
    // const userID2 = req.body.id_user;
    // console.log('userID2', userID2)
    if (user._id !== userID && user.role !== 2048) {
        return ErrorCode.ErrorCodeResponse(res, 401, "Your account do not have permission to access!");
    }
    next();
};

module.exports = {
    _login, _checkAuthen,
    _checkPermissionAdmin, _checkPermissionEmployees, _checkPermissionResident
}