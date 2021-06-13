const { Validation ,create_info} = require('../../utils');
const { ErrorCode } = require('../../constants')
const { UserService, ApartmentService, DepartmentService } = require('../../services');

async function _getAllUser(req, res, next) {
    try {
        let data = await UserService._getAllUser();
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _getUserByID(req, res, next) {
    const userId = req.params['userID'];
    const user = await UserService._getUserByID(userId);
    if (user) {
        try {
            return ErrorCode.ErrorCode200(res, user)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _getUserByApartmentID(req, res, next) {
    const apartmentID = req.params['apartmentID'];
    const user = await UserService._getUserByApartmentID(apartmentID);
    if (user) {
        try {
            return ErrorCode.ErrorCode200(res, user)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _getListEmployee(req, res, next) {
    try {
        let data = await UserService._getUserByRole(1024);
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _getListResident(req, res, next) {
    try {
        let data = await UserService._getUserByRole(1);
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _getListAdmin(req, res, next) {
    try {
        let data = await UserService._getUserByRole(2048);
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _createResident(req, res, next) {
    const body = req.body;
    if (Validation.check_PhoneNumber(body.phone_number) && body.id_Apartment) {
        const apartment = await ApartmentService._getApartmentByID(body.id_Apartment)
        if (apartment && !apartment.isUsed && !apartment.isHidden) {
            const user = await UserService._getUserByUsername(body.phone_number);
            if ((!user || user.isHidden) && Validation.check_Password(body.password)) {
                try {
                    let data = await UserService._createResident(body);
                    if (data) {
                         await ApartmentService._updateUsedApartment(body.id_Apartment)
                        if(!apartment?.guaranteeTime){
                            let guaranteeTime = create_info._getCurrentDate(8);
                            console.log(guaranteeTime)
                            await ApartmentService.updateGuaranteeTime(body.id_Apartment,guaranteeTime)
                        }
                        return ErrorCode.ErrorCode200(res, data)
                    }

                } catch (error) {
                    return ErrorCode.ErrorCode500(res)
                }
            } else {
                return ErrorCode.ErrorCodeResponse(res, 404, "Phone number already exists", null)
            }
        } else {
            return ErrorCode.ErrorCodeResponse(res, 402, "Please check your apartment is wrong", null)
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _createEmployee(req, res, next) {
    const body = req.body;
    const department = await DepartmentService._getDepartmentByID(body.department_id)
    if (department && !department.isHidden && Validation.check_PhoneNumber(body.phone_number) && Validation.check_Timestamp(body.dob)
        && body.address && Validation.check_Email(body.email) && body.department_id) {
        const user = await UserService._getUserByUsername(body.phone_number);
       if ((!user || user.isHidden) && Validation.check_Password(body.password)) {
            try {
                let data = await UserService._createEmployee(body);
                return ErrorCode.ErrorCode200(res, data)
            } catch (error) {
                return ErrorCode.ErrorCode500(res)
            }
        } else {
            return ErrorCode.ErrorCodeResponse(res, 404, "Phone number already exists", null)
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _updateUser(req, res, next) {
    const body = req.body;
    const userID = req.params['userID'];
    const isPhone = Validation.check_PhoneNumber(body.phone_number);
    const isEmail = Validation.check_Email(body.email);
    const isTimestamp = Validation.check_Timestamp(body.dob)
    const user = await UserService._getUserByID(userID);
    if (isPhone && user && (body.email ? isEmail : true) && (body.dob ? isTimestamp : true)) {
        try {
            let data = await UserService._updateUser(userID, body);
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};
async function _updateDeviceToken (req,res,next){
    const userId = req.params['userID'];
    const {deviceToken,type} = req.body;
    const user = await UserService._getUserByID(userId);
    if(user){
        try {
             await UserService._updateDeviceToken(userId,deviceToken,type);
            return ErrorCode.ErrorCode200(res,null);
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    }else{
        return  ErrorCode.ErrorCode404(res)
    } 
};

async function _updateAva(req, res, next) {
    const avatar = req.body.avatar;
    const userID = req.params['userID'];
    const user = await UserService._getUserByID(userID);
    if (user && avatar) {
        try {
            let data = await UserService._updateAva(userID, avatar);
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _updatePassword(req, res, next) {
    const body = req.body;
    const userID = req.params['userID'];
    const user = await UserService._getUserByID(userID);
    if (user && body.oldPassword && body.newPassword &&
        Validation.check_Password(body.oldPassword) && Validation.check_Password(body.newPassword)) {
        if (body.oldPassword === user.password) {
            try {
                let data = await UserService._updatePassword(userID, body.newPassword);
                return ErrorCode.ErrorCode200(res, data);
            } catch (error) {
                return ErrorCode.ErrorCode500(res)
            }
        } else {
            return ErrorCode.ErrorCodeResponse(res, 400, "Password is not right", null);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _hiddenUser(req, res, next) {
    const userID = req.params['userID'];
    const user = await UserService._getUserByID(userID);
    if (user) {
        try {
            await UserService._hiddenUser(userID);
            await ApartmentService._updateClearApartment(user.id_Apartment)
            return ErrorCode.ErrorCode200(res, null);
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _deleteUser(req, res, next) {
    const userID = req.params['userID'];
    const user = await UserService._getUserByID(userID);
    if (user) {
        try {
            await UserService._deleteUser(userID);
            return ErrorCode.ErrorCode200(res, null);
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};
module.exports = {
    _createEmployee, _createResident, _getUserByID, _getAllUser,
    _getListEmployee, _getListAdmin, _getListResident, _updateUser,
    _updateAva, _updatePassword, _hiddenUser, _deleteUser, _getUserByApartmentID,
    _updateDeviceToken
};