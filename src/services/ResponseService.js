const ResponseModel = require('../models/ReponseModel');
const mongoose = require('mongoose');
const { Validation } = require('../utils');

async function _queryDB(req) {
    return new Promise((resolve, reject) => {
        req
            .then(function (res) {
                resolve(res)
            })
            .catch(function (error) {
                console.log('error', error)
                reject(false);
            })
    })
};

const _getAllResponse = (status) => {
    let req = Validation.checkStatus(status) ? ResponseModel.findResponseByStatus(status)
        : ResponseModel.findResponse();
    return _queryDB(req);
};

const _getResponseByID = (resID) => {
    if (mongoose.Types.ObjectId.isValid(resID)) {
        let req = ResponseModel.findResponseByID(resID);
        return _queryDB(req);
    } else {
        return false
    }
};

const _getResponseByUserID = (userID, status) => {
    if (mongoose.Types.ObjectId.isValid(userID)) {
        let req = Validation.checkStatus(status) ? ResponseModel.findResponseByUserIDStatus(userID, status)
            : ResponseModel.findResponseByUserID(userID);
        return _queryDB(req);
    } else {
        return false
    }
};

const _getResponseByEmployID = (employeeID, status) => {
    if (mongoose.Types.ObjectId.isValid(employeeID)) {
        let req = Validation.checkStatus(status) ? ResponseModel.findResponseByEmployeeIDStatus(employeeID, status)
            : ResponseModel.findResponseByEmployeeID(employeeID);
        return _queryDB(req);
    } else {
        return false
    }
};

const _getResponseDetailByID = (resID) => {
    if (mongoose.Types.ObjectId.isValid(resID) && !Number.isInteger(resID)) {
        let req = ResponseModel.findResponseDetailByID(resID);
        return _queryDB(req);
    } else {
        return false
    }
};

const updateIsReport =(resID)=>{
    console.log('resId',resID)
    if (mongoose.Types.ObjectId.isValid(resID) && !Number.isInteger(resID)) {
        let req = ResponseModel.updateIsReport(resID);
        return _queryDB(req);
    } else {
        return false
    }
};

const _createResponse = (response) => {
    let params = {
        title: response.title,
        id_apartment: response.id_apartment,
        id_requirementType: response.id_requirementType,
        id_user: response.id_user,
        // id_employee: "",
        content: response.content,
        res_image: response.res_image ? response.res_image : [],
        status: 1,
        history: [{
            status: 1, created_at: Date.now()
        }],
        created_at: Date.now(),
        updated_at: Date.now()
    }
    console.log('params', params)
    let req = ResponseModel.Create_Response(params);
    return _queryDB(req);
};
const _updateEmployeeForReponse = (id_employee, response) => {
    let historyTmp = response.history;
    historyTmp[1] = {
        status: 2,
        id_employee: id_employee,
        created_at: Date.now()
    };
    let params = {
        _id: response._id,
        id_employee: id_employee,
        history: historyTmp,
        updated_at: Date.now()
    }
    console.log('params', params)
    let req = ResponseModel.updateEmployeeForResponse(params)
    return _queryDB(req);
};

const _updateResponseStatus = (body, response) => {
    let historyTmp = response.history
    historyTmp[body.status - 1] = {
        status: body.status,
        note: body.note,
        image: body.image ? body.image : [],
        created_at: Date.now(),
    }
    let params = {
        _id: response._id,
        status: body.status,
        history: historyTmp,
        updated_at: Date.now()
    }
    let req = ResponseModel.updateResponseStatus(params);
    return _queryDB(req);
};

const _cancelResponse = (body, response) => {
    let historyTmp = response.history
    historyTmp[6] = {
        status: 6,
        note: body.note,
        created_at: Date.now(),
    }
    let params = {
        _id: response._id,
        status: 6,
        history: historyTmp,
        updated_at: Date.now()
    }
    let req = ResponseModel.updateResponseStatus(params);
    return _queryDB(req);
};

const _hiddenResponse = (resID) => {
    let req = ResponseModel.hiddenResponse(resID);
    return _queryDB(req);
};

const _deleteResponse = (resID) => {
    let req = ResponseModel.deleteResponse(resID);
    return _queryDB(req);
};


module.exports = {
    _getAllResponse, _getResponseByID, _getResponseByUserID, _getResponseByEmployID, _getResponseDetailByID,
    _createResponse, _updateResponseStatus, _hiddenResponse, _deleteResponse,
    _updateEmployeeForReponse, _cancelResponse,updateIsReport
};