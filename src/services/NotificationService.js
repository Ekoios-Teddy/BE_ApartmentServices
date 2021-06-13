const NotificationModel = require('../models/NotificationModel');
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

const _getAllNotify = () => {
    let req = NotificationModel.findNotify();
    return _queryDB(req);
};

const _getNotifyByID = (notifyID) => {
    if (mongoose.Types.ObjectId.isValid(notifyID) && !Number.isInteger(notifyID)) {
        let req = NotificationModel.findNotifyByID(notifyID);
        return _queryDB(req)
    } else {
        return false
    }
};

const _createNotify = (notify) => {
    let params = {
        noti_title: notify.noti_title,
        noti_content: notify.noti_content,
        sended_at: notify.sended_at ? notify.sended_at : Date.now(),
        created_at: Date.now(),
        updated_at: Date.now()
    }
    console.log('"notify', params)
    let req = NotificationModel.Create_Notify(params);
    return _queryDB(req)
};

const _updateNotify = (_id, notify) => {
    let params = {
        _id,
        noti_title: notify.noti_title,
        noti_content: notify.noti_content,
        sended_at: notify.sended_at ? notify.sended_at : Date.now(),
        updated_at: Date.now()
    }
    let req = NotificationModel.updateNotify(params);
    return _queryDB(req);
};

const _hiddenNotify = (notifyID) => {
    let req = NotificationModel.hiddenNotify(notifyID);
    return _queryDB(req);
};

const _deleteNotify = (notifyID) => {
    let req = NotificationModel.deleteNotify(notifyID);
    return _queryDB(req);
};

module.exports = {
    _getAllNotify, _getNotifyByID, _createNotify, _updateNotify,
    _hiddenNotify, _deleteNotify
};
