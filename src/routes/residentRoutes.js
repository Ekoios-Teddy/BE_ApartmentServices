const express = require('express');
const residentRouter = express.Router();

const { adminUser, adminApartment, adminAuthen, adminNotify, adminResponse, adminRqmType } = require('../controllers/admin');

//response
// residentRouter.get("/response/:userID", adminAuthen._checkAuthen, adminAuthen._checkPermissionResident, adminResponse._getResponseByUserID);
// residentRouter.post('/response', adminAuthen._checkAuthen, adminResponse._createResponse);
residentRouter.put('/response/cancel/:resID', adminAuthen._checkAuthen, adminResponse._cancelResponse);

module.exports = { residentRouter };