let DepartmentModel = require('../models/DepartmentModel');
const mongoose = require('mongoose')
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

const _getAllDepartment = () => {
    let req = DepartmentModel.findDepartment();
    return _queryDB(req)
};

const _getDepartmentByID = (departmentID) => {
    console.log("departID", departmentID)
    if (mongoose.Types.ObjectId.isValid(departmentID) && !Number.isInteger(departmentID)) {
        let req = DepartmentModel.findDepartmentByID(departmentID);
        return _queryDB(req)
    } else {
        return false
    }
};

const _createDepartment = (department) => {
    let params = {
        dpm_name: department.dpm_name,
        dpm_unit: department.dpm_unit,
        created_at: Date.now(),
        updated_at:Date.now()
    };
    let req = DepartmentModel.Create_Department(params);
    return _queryDB(req)
};

const _updateDepartment = (_id, department) => {
    let params = {
        _id: _id,
        dpm_name: department.dpm_name,
        dpm_unit: department.dpm_unit,
        updated_at: Date.now()
    }
    let req = DepartmentModel.updateDepartment(params);
    return _queryDB(req)
};

const _hiddenDepartment = (departmentID) => {
    let req = DepartmentModel.hiddenDepartment(departmentID);
    return _queryDB(req)
};

const _deleteDepartment = (departmentID) => {
    let req = DepartmentModel.deleteDepartment(departmentID);
    return _queryDB(req)
};


module.exports = {
    _getAllDepartment, _createDepartment, _updateDepartment,
    _hiddenDepartment, _getDepartmentByID, _deleteDepartment
};