const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const NotificationSchema = new Schema({
    noti_title: { type: String, required: true },
    noti_content: { type: String, required: true },
    isHidden: { type: Boolean, required: true, default: false },
    sended_at: { type: Number, required: true, default: Date.now() },
    created_at: { type: Number, required: true, default: Date.now() },
    updated_at: { type: Number, required: true, default: Date.now() }
});

NotificationSchema.statics = {
    Create_Notify(notify) {
        return this.create(notify);
    },

    findNotify() {
        return this.find({ isHidden: false }).exec();
    },

    findNotifyByID(notifyID) {
        return this.findById(notifyID).exec();
    },

    updateNotify(notify) {
        return this.findOneAndUpdate({ _id: notify._id }, { $set: notify }, { new: true }).exec();
    },

    hiddenNotify(_id) {
        return this.updateOne({ _id }, { $set: { isHidden: true } }).exec();
    },

    deleteNotify(_id) {
        return this.deleteOne({ _id }).exec();
    }
};

module.exports = mongoose.model("notification", NotificationSchema);

