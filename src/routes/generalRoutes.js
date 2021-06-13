const express = require('express');
const generalRouter = express.Router();

const { adminUser,adminReport, adminApartment, adminAuthen, adminTower, adminNotify, adminResponse, adminRqmType } = require('../controllers/admin');


//authen
generalRouter.post("/login", adminAuthen._login);

//apartment
generalRouter.get("/apartment/:apartmentID", adminAuthen._checkAuthen, adminApartment._findApartmentByID);

//user
generalRouter.put("/user/avatar/:userID", adminAuthen._checkAuthen, adminAuthen._checkPermissionResident, adminUser._updateAva);
generalRouter.patch("/user/changepass/:userID", adminAuthen._checkAuthen, adminAuthen._checkPermissionResident, adminUser._updatePassword);
generalRouter.put("/user/:userID", adminAuthen._checkAuthen, adminAuthen._checkPermissionResident, adminUser._updateUser);
generalRouter.get("/user/:userID", adminAuthen._checkAuthen, adminAuthen._checkPermissionResident, adminUser._getUserByID);
generalRouter.get("/user/apartment/:apartmentID",  adminUser._getUserByApartmentID);
generalRouter.put("/user/token/:userID",adminAuthen._checkAuthen,adminUser._updateDeviceToken);

//response
generalRouter.get("/responsedetail/:resID", adminAuthen._checkAuthen, adminResponse._getResponseDetailById);
generalRouter.post('/response', adminAuthen._checkAuthen, adminResponse._createResponse);
generalRouter.get("/response2048/:userID", adminAuthen._checkAuthen, adminResponse._getAllResponse);
generalRouter.get("/response1/:userID", adminAuthen._checkAuthen, adminResponse._getResponseByUserID);
generalRouter.get("/response1024/:employeeID", adminAuthen._checkAuthen,adminResponse._getResponseByEmployeeID);

generalRouter.put('/response/status/:resID', adminAuthen._checkAuthen,  adminResponse._updateResponseStatusByID);
generalRouter.put('/response/status2/:resID', adminAuthen._checkAuthen,  adminResponse._updateEmployeeForReponse);
generalRouter.delete('/response/:resID', adminAuthen._checkAuthen, adminResponse._hiddenResponse);
//notify
generalRouter.get("/notify", adminAuthen._checkAuthen, adminNotify._getAllNotify);

//rqmtype
generalRouter.get("/rqmtype", adminAuthen._checkAuthen, adminRqmType._getAllRqmType);

//tower
generalRouter.get("/tower", adminAuthen._checkAuthen, adminTower._findAll_Tower);
generalRouter.get("/tower/:towerID", adminAuthen._checkAuthen, adminTower._findTowerByID);

//report
generalRouter.get("/report", adminAuthen._checkAuthen,adminAuthen._checkPermissionAdmin, adminReport._getAllReport);
generalRouter.get("/report/:reportID", adminAuthen._checkAuthen, adminReport._getReportByID);
generalRouter.post("/report/", adminAuthen._checkAuthen, adminReport._createReport);
generalRouter.put("/report/:reportID", adminAuthen._checkAuthen, adminReport._updateReport);
generalRouter.put("/report/status/:reportID", adminAuthen._checkAuthen, adminReport._updateReportStatusByID);
generalRouter.get("/report/response/:responseID", adminAuthen._checkAuthen, adminReport._getReportByResponseID);

module.exports = { generalRouter };