let ApartmentModel = require('../models/ApartmentModel');
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

const _getAllApartment = (floor_number) => {
    let req = Validation.check_Interger(floor_number) ? ApartmentModel.findApartmentByFloor(floor_number)
        : ApartmentModel.findApartment();
    return _queryDB(req)
};

const _getApartmentByID = (apartmentID) => {
    if (mongoose.Types.ObjectId.isValid(apartmentID) && !Number.isInteger(apartmentID)) {
        let req = ApartmentModel.findApartmentByID(apartmentID);
        return _queryDB(req)
    } else {
        return false
    }

};

const _createApartment = (apartment) => {
    let params = {
        tower_id: apartment.tower_id,
        apm_name: apartment.apm_name,
        apm_number: apartment.apm_number,
        floor_number: apartment.floor_number,
        isUsed: false,
        created_at: Date.now(),
        updated_at:Date.now()
    };
    let req = ApartmentModel.Create_Apartment(params);
    return _queryDB(req)
};

const _updateApartment = (_id, apartment) => {
    let params = {
        _id: _id,
        tower_id: apartment.tower_id,
        apm_name: apartment.apm_name,
        apm_number: apartment.apm_number,
        floor_number: apartment.floor_number,
        updated_at: Date.now()
    }
    let req = ApartmentModel.updateApartment(params);
    return _queryDB(req)
};

const _updateUsedApartment = (_id) => {
    let req = ApartmentModel.updateUsedApartment(_id)
    return _queryDB(req)
};

const updateGuaranteeTime = (_id,time) => {
    let req = ApartmentModel.updateGuaranteeTime(_id,time)
    return _queryDB(req)
};


const _updateClearApartment = (_id) => {
    let req = ApartmentModel.updateClearApartment(_id)
    return _queryDB(req)
};
const _hiddenApartment = (apartmentID) => {
    let req = ApartmentModel.hiddenApartment(apartmentID);
    return _queryDB(req)
};

const _deleteApartment = (apartmentID) => {
    let req = ApartmentModel.deleteApartment(apartmentID);
    return _queryDB(req)
};


module.exports = {
    _getAllApartment, _deleteApartment, _hiddenApartment,
    _updateApartment, _createApartment, _getApartmentByID, _updateClearApartment,
    _updateUsedApartment,updateGuaranteeTime
};