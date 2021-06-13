const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ApartmentSchema = new Schema({
    tower_id: { type: ObjectId, required: true, ref: "tower" },
    apm_name: { type: String, required: true },
    apm_number: { type: String, required: true },
    floor_number: { type: Number, require: true },
    guaranteeTime:{type:Number},
    isUsed: { type: Boolean, required: true, default: false },
    isHidden: { type: Boolean, required: true, default: false },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: Date.now() }
});

ApartmentSchema.statics = {
    Create_Apartment(apartment) {
        return this.create(apartment);
    },

    findApartment() {
        return this.find({ isHidden: false }).sort({ floor_number: 1, apm_number: 1 }).exec();
    },
    findApartmentByFloor(floor_number) {
        return this.find({ isHidden: false, floor_number }).sort({ apm_number: 1 }).exec();
    },
    findApartmentByID(apartmentID) {
        return this.findById(apartmentID).exec();
    },

    updateApartment(apartment) {
        return this.findOneAndUpdate({ _id: apartment._id }, { $set: apartment }, { new: true }).exec();
    },

    updateUsedApartment(_id) {
        return this.updateOne({ _id }, { $set: { isUsed: true, updated_at: Date.now() } }).exec();
    },

    updateGuaranteeTime (_id,guaranteeTime){
        return this.updateOne({_id},{$set:{guaranteeTime: guaranteeTime}}).exec()
    },
    updateClearApartment(_id) {
        return this.updateOne({ _id }, { $set: { isUsed: false, updated_at: Date.now() } }).exec();
    },

    hiddenApartment(_id) {
        return this.updateOne({ _id }, { $set: { isHidden: true, updated_at: Date.now() } }).exec();
    },

    deleteApartment(_id) {
        return this.deleteOne({ _id }).exec();
    }
};

module.exports = mongoose.model("apartment", ApartmentSchema);
