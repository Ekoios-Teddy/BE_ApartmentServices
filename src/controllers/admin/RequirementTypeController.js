const { ErrorCode } = require('../../constants')
const { RequirementTypeService } = require('../../services');

async function _getAllRqmType(req, res, next) {
    try {
        let data = await RequirementTypeService._getAllRqmType();
        return ErrorCode.ErrorCode200(res, data);
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _getRqmTypeByID(req, res, next) {
    const RqmTypeID = req.params['RqmTypeID'];
    const RqmType = await RequirementTypeService._getRqmTypeByID(RqmTypeID);
    if (RqmType) {
        try {
            return ErrorCode.ErrorCode200(res, RqmType)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }

};

async function _createRqmType(req, res, next) {
    const body = req.body;
    try {
        let data = await RequirementTypeService._createRqmType(body)
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res);
    }
};

async function _updateRqmType(req, res, next) {
    const body = req.body;
    const RqmTypeID = req.params["RqmTypeID"];
    const RqmType = await RequirementTypeService._getRqmTypeByID(RqmTypeID);
    if (RqmType) {
        try {
            let data = await RequirementTypeService._updateRqmType(RqmTypeID, body)
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _hiddenRqmType(req, res, next) {
    const RqmTypeID = req.params["RqmTypeID"];
    const RqmType = await RequirementTypeService._getRqmTypeByID(RqmTypeID);
    if (RqmType) {
        try {
            await RequirementTypeService._hiddenRqmType(RqmTypeID);
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _deleteRqmType(req, res, next) {
    const RqmTypeID = req.params["RqmTypeID"];
    const RqmType = await RequirementTypeService._getRqmTypeByID(RqmTypeID);
    if (RqmType) {
        try {
            await RequirementTypeService._deleteRqmType(RqmTypeID);
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

module.exports = {
    _getAllRqmType, _getRqmTypeByID, _createRqmType, _updateRqmType, _hiddenRqmType,
    _deleteRqmType,
}