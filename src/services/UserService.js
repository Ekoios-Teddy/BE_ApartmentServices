let UserModel = require('../models/UserModel');
const mongoose = require('mongoose');

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

const _getAllUser = () => {
    let req = UserModel.findAllUser();
    return _queryDB(req)
};

const _getUserByID = (userID) => {
    if (mongoose.Types.ObjectId.isValid(userID) && !Number.isInteger(userID)) {
        let req = UserModel.findUserById(userID);
        return _queryDB(req)
    } else {
        return false
    }
};

const _getUserByRole = (role) => {
    let req = UserModel.findUserByRole(role);
    return _queryDB(req);
};

const _getUserByUsername = (username) => {
    let req = UserModel.findUserByUsername(username);
    return _queryDB(req);
};

const _getUserByApartmentID = (apartment_id) => {
    let req = UserModel.findUserByApartmentID(apartment_id);
    return _queryDB(req)
};

const _createResident = (user) => {
    let params = {
        username: user.phone_number,
        password: user.password,
        full_name: user.full_name,
        phone_number: user.phone_number,
        id_Apartment: user.id_Apartment,
        tower_id: user.tower_id,
        role: 1
    }
    let req = UserModel.createUser(params);
    return _queryDB(req)
};

const _createEmployee = (user) => {
    let params = {
        username: user.phone_number,
        password: user.password,
        full_name: user.full_name,
        phone_number: user.phone_number,
        // id_Apartment: user.id_Apartment,
        department_id: user.department_id,
        dob: user.dob,
        address: user.address,
        email: user.email,
        tower_id: user.tower_id,
        role: 1024,
        created_at: Date.now(),
        updated_at: Date.now()
    }
    let req = UserModel.createUser(params);
    return _queryDB(req)
};

const _updateUser = (_id, user) => {
    let params = {
        _id: _id,
        full_name: user.full_name,
        phone_number: user.phone_number,
        dob: user.dob,
        // id_Apartment: role == 1 ? user.id_Apartment : null,
        // department_id: role == 1024 ? user.department_id : null,
        email: user.email,
        address: user.address,
        updated_at: Date.now()
    }
    let req = UserModel.updateUser(params);
    return _queryDB(req)
};

const _getListToken =()=>{
    let req= UserModel.findListToken();
    return _queryDB(req)
};

const _updateAva = (_id, ava) => {
    let req = UserModel.updateAvatar(_id, ava);
    return _queryDB(req);
};

const _updateDeviceToken =(_id,deviceToken,type)=>{
    let req = null;
    if(type==='put'){
    req = UserModel.updateDevice(_id,deviceToken);
    }
    if(type=='delete'){
    req = UserModel.deleteDevice(_id,deviceToken);
    }
    return _queryDB(req);
};

const _updatePassword = (_id, password) => {
    let req = UserModel.updatePassword(_id, password);
    return _queryDB(req)
};

const _hiddenUser = (userID) => {
    let req = UserModel.hiddenUserByUserID(userID);
    return _queryDB(req)
};

const _deleteUser = (userID) => {
    let req = UserModel.deleteUserByUserID(userID);
    return _queryDB(req)
};


module.exports = {
    _deleteUser, _hiddenUser, _updatePassword, _updateAva, _createResident,
    _updateUser, _createEmployee, _getUserByRole, _getUserByID, _getAllUser,
    _getUserByUsername, _getUserByApartmentID,_updateDeviceToken,_getListToken
};