const express = require('express');
const employeeRouter = express.Router();

const { adminUser, adminApartment, adminAuthen, adminNotify, adminResponse, adminRqmType } = require('../controllers/admin');

//response
// employeeRouter.get("/response/:employeeID", adminAuthen._checkAuthen, adminAuthen._checkPermissionEmployees, adminAuthen._checkPermissionEmployees, adminResponse._getResponseByEmployeeID);
// employeeRouter.put('/response/status/:resID', adminAuthen._checkAuthen, adminAuthen._checkPermissionEmployees, adminResponse._updateResponseStatusByIDForEmployee);

module.exports = { employeeRouter };