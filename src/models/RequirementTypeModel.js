const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const RequirementTypeSchema = new Schema({
    requirement_name: { type: String, required: true },
    isHidden: { type: Boolean, required: true, default: false },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: Date.now() }
});

RequirementTypeSchema.statics = {
    Create_RqmType(rqm_type) {
        return this.create(rqm_type);
    },

    findRqmType() {
        return this.find({ isHidden: false }).exec();
    },

    findRqmTypeByID(rqm_typeID) {
        console.log('idd', rqm_typeID)
        return this.findById(rqm_typeID).exec();
    },

    updateRqmType(rqm_type) {
        return this.findOneAndUpdate({ _id: rqm_type._id }, { $set: rqm_type }, { new: true }).exec();
    },

    hiddenRqmType(_id) {
        return this.updateOne({ _id }, { $set: { isHidden: true } }).exec();
    },

    deleteRqmType(_id) {
        console.log('_id', _id)
        return this.deleteOne({ _id }).exec();
    }
};

module.exports = mongoose.model("requirement_type", RequirementTypeSchema);

