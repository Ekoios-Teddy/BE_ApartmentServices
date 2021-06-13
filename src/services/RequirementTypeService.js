const RequirementTypeModel = require('../models/RequirementTypeModel');
const mongoose = require('mongoose');

async function _queryDB(req) {
    return new Promise((resolve, reject) => {
        req
            .then(function (res) {
                resolve(res)
            })
            .catch(function (error) {
                reject(false);
            })
    })
};

const _getAllRqmType = () => {
    let req = RequirementTypeModel.findRqmType();
    return _queryDB(req);
};

const _getRqmTypeByID = (RqmTypeID) => {
    if (mongoose.Types.ObjectId.isValid(RqmTypeID) && !Number.isInteger(RqmTypeID)) {
        let req = RequirementTypeModel.findRqmTypeByID(RqmTypeID);
        return _queryDB(req)
    } else {
        console.log('alo', RqmTypeID)
        return false
    }
};

const _createRqmType = (RqmType) => {
    let params = {
        requirement_name: RqmType.requirement_name,
        created_at: Date.now(),
        updated_at: Date.now()
    }
    console.log('"RqmType', params)
    let req = RequirementTypeModel.Create_RqmType(params);
    return _queryDB(req)
};

const _updateRqmType = (_id, RqmType) => {
    let params = {
        _id,
        requirement_name: RqmType.requirement_name,
        updated_at: Date.now()
    }
    let req = RequirementTypeModel.updateRqmType(params);
    return _queryDB(req);
};

const _hiddenRqmType = (RqmTypeID) => {
    let req = RequirementTypeModel.hiddenRqmType(RqmTypeID);
    return _queryDB(req);
};

const _deleteRqmType = (RqmTypeID) => {
    let req = RequirementTypeModel.deleteRqmType(RqmTypeID);
    return _queryDB(req);
};

module.exports = {
    _getAllRqmType, _getRqmTypeByID, _createRqmType, _updateRqmType,
    _hiddenRqmType, _deleteRqmType
};
