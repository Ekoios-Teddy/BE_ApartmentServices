const { ApartmentService } = require('../../services');
const { ErrorCode } = require('../../constants');

async function _findAll_Apartment(req, res, next) {
    const floor = req.query.floor_number;
    try {
        let data = await ApartmentService._getAllApartment(floor);
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _findApartmentByID(req, res, next) {
    const apartID = req.params['apartmentID'];
    const apartment = await ApartmentService._getApartmentByID(apartID);
    if (apartment) {
        try {
            return ErrorCode.ErrorCode200(res, apartment)
        }
        catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _createApartment(req, res, next) {
    const body = req.body;
    try {
        const data = await ApartmentService._createApartment(body);
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _updateApartment(req, res, next) {
    const body = req.body;
    const apartmentID = req.params['apartmentID']
    const apartment = await ApartmentService._getApartmentByID(apartmentID);
    if (apartment) {
        try {
            const data = await ApartmentService._updateApartment(apartmentID, body);
            return ErrorCode.ErrorCode200(res, data)
        }
        catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _hiddenApartment(req, res, next) {
    const apartmentID = req.params['apartmentID']
    const apartment = await ApartmentService._getApartmentByID(apartmentID);
    if (apartment) {
        try {
            await ApartmentService._hiddenApartment(apartmentID);
            return ErrorCode.ErrorCode200(res, null)
        }
        catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _deleteApartment(req, res, next) {
    const apartmentID = req.params['apartmentID']
    const apartment = await ApartmentService._getApartmentByID(apartmentID);
    if (apartment) {
        try {
            await ApartmentService._deleteApartment(apartmentID);
            return ErrorCode.ErrorCode200(res, null)
        }
        catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

module.exports = {
    _findAll_Apartment, _createApartment, _findApartmentByID,
    _updateApartment, _hiddenApartment, _deleteApartment
}