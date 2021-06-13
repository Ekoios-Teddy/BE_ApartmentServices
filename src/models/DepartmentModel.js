const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const DepartmentModel = new Schema({
    dpm_name: { type: String, required: true },
    dpm_unit: { type: String, required: true },
    isHidden: { type: Boolean, required: true, default: false },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: Date.now() }
});

DepartmentModel.statics = {
    Create_Department(department) {
        return this.create(department);
    },

    findDepartment() {
        return this.find({ isHidden: false }).exec();
    },

    findDepartmentByID(departmentID) {
        return this.findById(departmentID).exec();
    },

    updateDepartment(department) {
        return this.findOneAndUpdate({ _id: department._id }, { $set: department }, { new: true }).exec();
    },

    hiddenDepartment(_id) {
        return this.updateOne({ _id }, { $set: { isHidden: true } }).exec();
    },

    deleteDepartment(_id) {
        ('_id', _id)
        return this.deleteOne({ _id }).exec();
    }
};

module.exports = mongoose.model("department", DepartmentModel);

