const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const TowerSchema = new Schema({
    tower_name: { type: String, required: true },
    apartments_per_floor: { type: Number, required: true },
    floor_number: { type: Number, require: true },
    sign: { type: String, required: true },
    description: { type: String },
    address: { type: String, required: true },
    hotline:{type:String,required:true},
    isHidden: { type: Boolean, required: true, default: false },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: Date.now() }
});

TowerSchema.statics = {
    Create_Tower(tower) {
        return this.create(tower);
    },

    findTower() {
        return this.find({ isHidden: false }).exec();
    },

    findTowerByID(towerID) {
        return this.findById(towerID).exec();
    },

    // updateTower(_id, tower) {
    //     return this.findOneAndUpdate({ _id }, { $set: tower }, { new: true }).exec();
    // },

    // hiddenTower(_id) {
    //     return this.updateOne({ _id }, { $set: { isHidden: true } }).exec();
    // },
    deleteTower(_id) {
        return this.deleteOne({ _id }).exec();
    }
};

module.exports = mongoose.model("tower", TowerSchema);

