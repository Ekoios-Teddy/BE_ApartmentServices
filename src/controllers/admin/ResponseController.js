const { ResponseService, UserService, ApartmentService, RequirementTypeService, } = require('../../services');
const { ErrorCode } = require('../../constants');
const ReponseModel = require('../../models/ReponseModel');
const { Validation } = require('../../utils');

async function _getAllResponse(req, res, next) {
    const status = req.query.status;
    try {
        let data = await ResponseService._getAllResponse(status);
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _getResponseByUserID(req, res, next) {
    const params = req.params['userID'];
    const status = req.query.status;
    const user = await UserService._getUserByID(params);
    if (user) {
        try {
            const data = await ResponseService._getResponseByUserID(params, status);
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _getResponseByEmployeeID(req, res, next) {
    const params = req.params['employeeID'];
    const status = req.query.status;
    const employee = await UserService._getUserByID(params);
    if (employee && employee.role == 1024) {
        try {
            const data = await ResponseService._getResponseByEmployID(params, status);
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _getResponseDetailById(req, res, next) {
    const params = req.params['resID'];
    const response = await ResponseService._getResponseByID(params);
    if (response && response.isHidden == false) {
        try {
            let data = await ResponseService._getResponseDetailByID(params);
            return ErrorCode.ErrorCode200(res, data);
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _createResponse(req, res, next) {
    const body = req.body;
    const apartment = await ApartmentService._getApartmentByID(body.id_apartment);
    const rqmtype = await RequirementTypeService._getRqmTypeByID(body.id_requirementType);
    const user = await UserService._getUserByID(body.id_user);
    if (apartment && apartment.isHidden == false &&
        rqmtype && rqmtype.isHidden == false &&
        user && user.isHidden == false) {
        // if (req.user.role == 2048 || req.user._id == body.id_user) {
        try {
            const data = await ResponseService._createResponse(body);
            return ErrorCode.ErrorCode200(res, data);
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
        // } else {
        // return ErrorCode.ErrorCodeResponse(res, 401, "Your account do not have permission to create for this user! ", null)
        // }

    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _updateEmployeeForReponse(req, res, next) {
    const responseID = req.params['resID'];
    const response = await ResponseService._getResponseByID(responseID);
    const employee = await UserService._getUserByID(req.body.id_employee);
    if (response && employee && employee.role == 1024) {
        try {
            const data = await ResponseService._updateEmployeeForReponse(req.body.id_employee, response);
            return ErrorCode.ErrorCode200(res, data);
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _updateResponseStatusByID(req, res, next) {
    const responseID = req.params['resID'];
    const body = req.body;
    const response = await ResponseService._getResponseByID(responseID);
    if (response) {
        try {
            const data = await ResponseService._updateResponseStatus(body, response)
            return ErrorCode.ErrorCode200(res, data);
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _updateResponseStatusByIDForEmployee(req, res, next) {
    const responseID = req.params['resID'];
    const body = req.body;
    const response = await ResponseService._getResponseByID(responseID);
    if (response && Validation.checkStatusResponse(response.status, body.status)) {
        if (req.user._id == response.id_employee) {
            try {
                const data = await ResponseService._updateResponseStatus(body, response)
                return ErrorCode.ErrorCode200(res, data);
            } catch (error) {
                return ErrorCode.ErrorCode500(res);
            }
        } else {
            return ErrorCode.ErrorCodeResponse(res, 400, "Your account do not have permission to update status! ", null)
        };
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _cancelResponse(req, res, next) {
    const responseID = req.params['resID'];
    const body = req.body;
    const response = await ResponseService._getResponseByID(responseID);
    if (response && response.status == 1 && body.note) {
        if (req.user._id == response.id_user) {
            try {
                const data = await ResponseService._cancelResponse(body, response);
                return ErrorCode.ErrorCode200(res, data)
            } catch (error) {
                return ErrorCode.ErrorCode500(res);
            }
        } else {
            return ErrorCode.ErrorCodeResponse(res, 401, "Your account do not have permission to cancel response!", null)
        }

    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _hiddenResponse(req, res, next) {
    const responseID = req.params['resID'];
    const response = await ResponseService._getResponseByID(responseID);
    if (response) {
        try {
            await ResponseService._hiddenResponse(responseID);
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _deleteResponse(req, res, next) {
    const responseID = req.params['resID'];
    const response = await ResponseService._getResponseByID(responseID);
    if (response) {
        try {
            await ResponseService._deleteResponse(responseID);
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

module.exports = {
    _getAllResponse, _getResponseByUserID, _getResponseByEmployeeID, _getResponseDetailById,
    _createResponse, _updateEmployeeForReponse, _updateResponseStatusByID, _updateResponseStatusByIDForEmployee,
    _hiddenResponse, _deleteResponse, _cancelResponse
};