const express = require('express');
const adminRouter = express.Router();

// const { _uploadMutilPhoto } = require('../controllers/admin/uploadsController')
const { adminUser, adminApartment, adminAuthen, adminNotify, adminTower, adminDepartment, adminRqmType } = require('../controllers/admin');

// adminRouter.post("/uploads-photos", _uploadMutilPhoto)
//department
adminRouter.get("/department", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminDepartment._findAll_Department);
adminRouter.post("/department", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminDepartment._createDepartment);
adminRouter.put("/department/:departmentID", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminDepartment._updateDepartment);
adminRouter.delete("/department/:departmentID", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminDepartment._hiddenDepartment);
//apartment
adminRouter.get("/apartment", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminApartment._findAll_Apartment);
// adminRouter.post("/apartment", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminApartment._createApartment);
adminRouter.put("/apartment/:apartmentID", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminApartment._updateApartment);
adminRouter.delete("/apartment/:apartmentID", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminApartment._hiddenApartment);

//user
adminRouter.get("/user", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminUser._getAllUser);
adminRouter.delete("/user/:userID", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminUser._hiddenUser);

//employee
adminRouter.get("/employee", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminUser._getListEmployee);
adminRouter.post("/employee", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminUser._createEmployee);

//resident
adminRouter.get("/resident", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminUser._getListResident);
adminRouter.post("/resident", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminUser._createResident);

//notification
adminRouter.post("/notify", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminNotify._createNotify);
adminRouter.put("/notify/:notifyID", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminNotify._updateNotify);
adminRouter.delete("/notify/:notifyID", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminNotify._hiddenNotify);

adminRouter.post("/pushnotify", adminAuthen._checkAuthen, adminNotify._pushNotification);
//requirementType
// adminRouter.post("/rqmtype", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminRqmType._createRqmType);
// adminRouter.put("/rqmtype/:RqmTypeID", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminRqmType._updateRqmType);
// adminRouter.delete("/rqmtype/:RqmTypeID", adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminRqmType._hiddenRqmType);

//response

adminRouter.post("/tower", adminAuthen._checkAuthen, adminTower._createTower);

// adminRouter.post('/response', adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminResponse._createResponse);
// adminRouter.put('/response/status/:resID', adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminResponse._updateResponseStatusByID);
// adminRouter.put('/response/status2/:resID', adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminResponse._updateEmployeeForReponse);
// adminRouter.delete('/response/:resID', adminAuthen._checkAuthen, adminAuthen._checkPermissionAdmin, adminResponse._hiddenResponse);

module.exports = { adminRouter };
