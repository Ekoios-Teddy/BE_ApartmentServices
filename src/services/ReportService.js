let ReportModel = require('../models/ReportModel');
const { Validation } = require('../utils');

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

const _getAllReport = (status) => {
    let req = Validation.check_Interger(status) ?
     ReportModel.getListReportByStatus(status)
        : ReportModel.getListReport();
    return _queryDB(req)
};

const _getReportByID = (ReportID) => {
    if (mongoose.Types.ObjectId.isValid(ReportID) && !Number.isInteger(ReportID)) {
        let req = ReportModel.getReportByID(ReportID);
        return _queryDB(req)
    } else {
        return false
    }
};

const _getReportByResponseID =(responseID)=>{
    if(mongoose.Types.ObjectId.isValid(responseID)&& !Number.isInteger(responseID)){
        let req = ReportModel.getReportDetailByResponseID(responseID);
        return _queryDB(req)
    }else{
        return false
    }
};

const _createReport = (report) => {
    let params = {
        title: report?.title,
        idResponse: report?.idResponse,
        issue: report?.issue,
        reportDate:report?.reportDate,
        resolvePlan: report?.resolvePlan,
        history:[{status:1,created_at:Date.now()}] ,
        fee:report?.fee,
        images:report?.image || [],
        status:1,
        createdBy:report?.createdBy,
        created_at:Date.now(),
        updated_at:Date.now()
    };

    let req = ReportModel.createReport(params);
    return _queryDB(req)
};

const _updateReport = (_id, report) => {
    console.log('reprot',report?.images)
    let params = {
        title: report?.title,
        issue: report?.issue,
        reportDate:report?.reportDate,
        resolvePlan: report?.resolvePlan,
        history:report?.history  || [] ,
        fee:report?.fee,
        images:report?.images || [],
        status:1,
        createdBy:report?.createdBy,
        updated_at:Date.now()
    }
    let req = ReportModel.updateReport(_id,params);
    return _queryDB(req)
};

const _updateStatusReport = (_id,status) => {
    let req = ReportModel.updateStatus(_id,status)
    return _queryDB(req)
};

const _hiddenReport = (_id) => {
    let req = ReportModel.hiddenReport(_id)
    return _queryDB(req)
};

const _deleteReport = (_id) => {
    let req = ReportModel.deleteReport(_id);
    return _queryDB(req)
};

module.exports = {
    _getAllReport, _deleteReport, _hiddenReport,
    _updateReport, _createReport, _getReportByID,
    _updateStatusReport,_getReportByResponseID
};