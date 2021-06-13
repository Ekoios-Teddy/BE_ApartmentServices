const { TowerService, ApartmentService } = require('../../services');
const { Validation, create_info } = require('../../utils');
const { ErrorCode } = require('../../constants');

async function _findAll_Tower(req, res, next) {
    try {
        let data = await TowerService._getAllTower();
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _findTowerByID(req, res, next) {
    const towerID = req.params['towerID'];
    const tower = await TowerService._getTowerByID(towerID);
    if (tower) {
        try {
            return ErrorCode.ErrorCode200(res, tower)
        }
        catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _createTower(req, res, next) {
    const body = req.body;
    const user = req.user;
    if (user.role == 1512) {
        try {
            const data = await TowerService._createTower(body);
            if (data) {
                let tmpApart = await create_info.create_Apartment(data._id, data.apartments_per_floor, data.floor_number, data.sign);
                for (let i = 0; i < tmpApart.length; i++) {
                    await ApartmentService._createApartment(tmpApart[i])
                }
                return ErrorCode.ErrorCode200(res, data)
            }

        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCodeResponse(res, 444, "Your permission not enough", null)
    }

};

// async function _updateTower(req, res, next) {
//     const body = req.body;
//     const towerID = req.params['towerID']
//     const tower = await TowerService._getTowerByID(towerID);
//     if (tower) {
//         try {
//             const data = await TowerService._updateTower(towerID, body);
//             return ErrorCode.ErrorCode200(res, data)
//         }
//         catch (error) {
//             return ErrorCode.ErrorCode500(res);
//         }
//     } else {
//         return ErrorCode.ErrorCode404(res);
//     }
// };

// async function _hiddenTower(req, res, next) {
//     const towerID = req.params['towerID']
//     const tower = await TowerService._getTowerByID(towerID);
//     if (tower) {
//         try {
//             await TowerService._hiddenTower(towerID);
//             return ErrorCode.ErrorCode200(res, null)
//         }
//         catch (error) {
//             return ErrorCode.ErrorCode500(res);
//         }
//     } else {
//         return ErrorCode.ErrorCode404(res);
//     }
// };

async function _deleteTower(req, res, next) {
    const towerID = req.params['towerID']
    const tower = await TowerService._getTowerByID(towerID);
    if (tower) {
        try {
            await TowerService._deleteTower(towerID);
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
    _findAll_Tower, _createTower, _findTowerByID,
    _deleteTower
}