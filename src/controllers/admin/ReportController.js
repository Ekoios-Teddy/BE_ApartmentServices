const { ReportService,ResponseService, UserService, ApartmentService, RequirementTypeService, } = require('../../services');
const { ErrorCode } = require('../../constants');
const { Validation } = require('../../utils');

async function _getAllReport(req, res, next) {
    const status = req.query.status;
    try {
        let data = await ReportService._getAllReport(status);
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _getReportByID(req, res, next) {
    const reportID = req.params['reportID'];
    const data = await ReportService._getReportByID(reportID);
    if (data) {
        try {
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _getReportByResponseID(req, res, next) {
    const responseID = req.params['responseID'];
    const data = await ReportService._getReportByResponseID(responseID);
    if (data) {
        try {
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};
async function _createReport(req, res, next) {
    const body = req.body;
    const response = await ResponseService._getResponseByID(body.idResponse);
    const employee = await UserService._getUserByID(body.createdBy);
    if (response && response.status===3 &&
        employee && !employee.isHidden) {
        try {
            const data = await ReportService._createReport(body);
            if(data){
                console.log('alo')
                await ResponseService.updateIsReport(body?.idResponse)
            }
            return ErrorCode.ErrorCode200(res, data);
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _updateReport(req, res, next) {
    const reportID = req.params['reportID'];
    const body = req.body
    const report = await ReportService._getReportByID(reportID);
    const employee = await UserService._getUserByID(body?.createdBy);
    if (report && employee && !employee.isHidden) {
        try {
            const data = await ReportService._updateReport(reportID, body);
            return ErrorCode.ErrorCode200(res, data);
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _updateReportStatusByID(req, res, next) {
    const reportID = req.params['reportID'];
    const {type} = req.body
    let status = null
    if(type==='reset'){
        status=1
    }
    if(type==='confirm'){
        status =2
    }
    if(type==='refuse'){
        status =3
    }
    const report = await ReportService._getReportByID(reportID);
    if (report &&( (report.status !==1 && type==='reset') || (report.status ===1 && type!=='reset'))) {
        try {
            const data = await ReportService._updateStatusReport(reportID, status)
            return ErrorCode.ErrorCode200(res, data);
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _hiddenReport(req, res, next) {
    const reportID = req.params['reportID'];
    const report = await ReportService._getReportByID(reportID);
    if (report) {
        try {
            await ReportService._hiddenReport(reportID);
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _deleteReport(req, res, next) {
    const reportID = req.params['reportID'];
    const report = await ReportService._getReportByID(reportID);
    if (report) {
        try {
            await ReportService._deleteReport(reportID);
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

module.exports = {
    _getAllReport, _getReportByID, _updateReport,_getReportByResponseID,
    _createReport,  _updateReportStatusByID,_hiddenReport, _deleteReport
};