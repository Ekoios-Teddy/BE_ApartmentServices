const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const { BASE_API_URL } = require('../constants')
const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    tower_id: { type: ObjectId, required: true, ref: 'tower' },
    id_Apartment: { type: ObjectId, default: null, ref: 'apartment' },
    phone_number: { type: String, required: true },
    dob: { type: Number },
    email: { type: String },
    address: { type: String },
    avatar: { type: String, required: true, default: `${BASE_API_URL}/uploads/avatarImage_1613064472326.png` },
    department_id: { type: ObjectId, default: null, ref: "department" },
    deviceToken:[{type:String,unique:true}],
    isHidden: { type: Boolean, required: true, default: false },
    role: { type: Number, required: true, default: 1 },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: Date.now() }
});

UserSchema.statics = {
    createUser(user) {
        return this.create(user);
    },

    findAllUser() {
        return this.find({ isHidden: false }).populate("id_Apartment").populate("department_id").select("-password").exec();
    },
    findUSerByTowerID(tower_id) {
        return this.find({ tower_id }).select("-password").exec();
    },
    findUserById(userID) {
        return this.findById(userID).populate("id_Apartment").populate("department_id").exec();
    },

    findListToken (){
        return this.find({}).select("-_id deviceToken")
    },
    findUserByRole(role) {
        return this.find({ role: role, isHidden: false }).populate("id_Apartment").populate("department_id").select("-password").exec();
    },

    findUserByUsername(phone_number) {
        return this.findOne({ username: phone_number, isHidden: false }).exec();
    },
    findUserByApartmentID(id_Apartment) {
        return this.findOne({ id_Apartment, isHidden: false }).exec();
    },
    updateUser(user) {
        return this.findOneAndUpdate({ _id: user._id }, { $set: user }, { new: true }).select("-password").exec();
    },

    updateAvatar(_id, ava) {
        return this.findOneAndUpdate({ _id }, { $set: { avatar: ava } }, { new: true }).exec();
    },

    updateDevice (_id,deviceToken){
        return this.findOneAndUpdate({_id},{$addToSet:{deviceToken}}).select("-password").exec();
    },
    deleteDevice (_id,deviceToken){
        return this.findOneAndUpdate({_id},{$pull:{deviceToken}}).select("-password").exec();
    },
    updatePassword(_id, password) {
        return this.findOneAndUpdate({ _id }, { $set: { password: password } }, { new: true }).exec();
    },

    hiddenUserByUserID(user_id) {
        return this.findOneAndUpdate({ _id: user_id }, { $set: { isHidden: true } }).select("-password").exec();
    },

    deleteUserByUserID(user_id) {
        return this.findOneAndDelete({ _id: user_id }).exec();
    },
    
};

module.exports = mongoose.model("user", UserSchema);

