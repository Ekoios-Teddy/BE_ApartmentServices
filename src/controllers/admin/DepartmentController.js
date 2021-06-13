const { DepartmentService } = require('../../services');
const { ErrorCode } = require('../../constants');

async function _findAll_Department(req, res, next) {
    try {
        let data = await DepartmentService._getAllDepartment();
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _findDepartmentByID(req, res, next) {
    const departID = req.params['departmentID'];
    const department = await DepartmentService._getDepartmentByID(departID);
    if (department) {
        try {
            return ErrorCode.ErrorCode200(res, department)
        }
        catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _createDepartment(req, res, next) {
    const body = req.body;
    try {
        const data = await DepartmentService._createDepartment(body);
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _updateDepartment(req, res, next) {
    const body = req.body;
    const departID = req.params['departmentID']
    const department = await DepartmentService._getDepartmentByID(departID);
    if (department) {
        try {
            const data = await DepartmentService._updateDepartment(departID, body);
            return ErrorCode.ErrorCode200(res, data)
        }
        catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _hiddenDepartment(req, res, next) {
    const departmentID = req.params['departmentID']
    const department = await DepartmentService._getDepartmentByID(departmentID);
    if (department) {
        try {
            await DepartmentService._hiddenDepartment(departmentID);
            return ErrorCode.ErrorCode200(res, null)
        }
        catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _deleteDepartment(req, res, next) {
    const departmentID = req.params['departmentID']
    const department = await DepartmentService._getDepartmentByID(departmentID);
    if (department) {
        try {
            await DepartmentService._deleteDepartment(departmentID);
            return ErrorCode.ErrorCode200(res, null)
        }
        catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

module.exports = {
    _findAll_Department, _createDepartment, _findDepartmentByID,
    _updateDepartment, _hiddenDepartment, _deleteDepartment
}