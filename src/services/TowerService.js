let TowerModel = require('../models/TowerModel');
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

const _getAllTower = () => {
    let req = TowerModel.findTower();
    return _queryDB(req)
};

const _getTowerByID = (TowerID) => {
    if (mongoose.Types.ObjectId.isValid(TowerID) && !Number.isInteger(TowerID)) {
        let req = TowerModel.findTowerByID(TowerID);
        return _queryDB(req)
    } else {
        return false
    }
};

const _createTower = (tower) => {
    let params = {
        ...tower,
        isHidden: false,
        created_at: Date.now(),
        updated_at: Date.now()
    };
    console.log('params', params)
    let req = TowerModel.Create_Tower(params);
    return _queryDB(req)
};

const _updateTower = (_id, tower) => {
    delete (tower.created_at, tower.isHidden)
    let params = {
        ...tower,
        updated_at: Date.now()
    }
    let req = TowerModel.updateTower(_id, params);
    return _queryDB(req)
};

const _hiddenTower = (TowerID) => {
    let req = TowerModel.hiddenTower(TowerID);
    return _queryDB(req)
};

const _deleteTower = (TowerID) => {
    let req = TowerModel.deleteTower(TowerID);
    return _queryDB(req)
};


module.exports = {
    _getAllTower, _deleteTower, _hiddenTower,
    _updateTower, _createTower, _getTowerByID
};