const { ErrorCode } = require('../../constants')
const { NotificationService,UserService } = require('../../services');
var FCM = require('fcm-node');
var serverKey = require('../../constants/apatmentda-firebase-adminsdk-q4kk2-fa404a46d6.json') //put the generated private key path here    
var fcm = new FCM(serverKey)

async function _pushNotification(data) {
    const listToken = await UserService._getListToken();
    let arr=[]
    listToken.map(item=> {return item.deviceToken}).map(item=>{
    arr=[...arr,...item]
})
  var message = {
    registration_ids: [...arr],   
    notification: {
        title: data?.noti_title,
        body: data?.noti_content,
    },
};
 fcm.send(message, function (err, response) {
    if (err) {
        return err
    } else {
         return response
    }
})
return result
};

async function _getAllNotify(req, res, next) {
    try {
        let data = await NotificationService._getAllNotify();
        return ErrorCode.ErrorCode200(res, data);
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _getNotifyByID(req, res, next) {
    const notifyID = req.params['notifyID'];
    const notify = await NotificationService._getNotifyByID(notifyID);
    if (notify) {
        try {
            return ErrorCode.ErrorCode200(res, notify)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }

};

async function _createNotify(req, res, next) {
    const body = req.body;
    const {noti_content,noti_title}=req?.body;
    try {
        let data = await NotificationService._createNotify(body)
        if(data){
             _pushNotification({noti_content,noti_title})
            return ErrorCode.ErrorCode200(res, data)
        }
    } catch (error) {
        return ErrorCode.ErrorCode500(res);
    }
};

async function _updateNotify(req, res, next) {
    const body = req.body;
    const notifyID = req.params["notifyID"];
    const notify = await NotificationService._getNotifyByID(notifyID);
    if (notify) {
        try {
            let data = await NotificationService._updateNotify(notifyID, body)
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _hiddenNotify(req, res, next) {
    const notifyID = req.params["notifyID"];
    const notify = await NotificationService._getNotifyByID(notifyID);
    if (notify) {
        try {
            await NotificationService._hiddenNotify(notifyID);
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

async function _deleteNotify(req, res, next) {
    const notifyID = req.params["notifyID"];
    const notify = await NotificationService._getNotifyByID(notifyID);
    if (notify) {
        try {
            await NotificationService._deleteNotify(notifyID);
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res);
        }
    } else {
        return ErrorCode.ErrorCode404(res);
    }
};

module.exports = {
    _getAllNotify, _getNotifyByID, _createNotify, _updateNotify, _hiddenNotify,
    _deleteNotify, _pushNotification
}