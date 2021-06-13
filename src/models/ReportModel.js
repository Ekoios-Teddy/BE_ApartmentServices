const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ReportSchema = new Schema({
    title: { type: String, required: true },
    idResponse: { type: ObjectId, required: true, ref: "response" },
    issue: { type: String, required: true },
    resolvePlan: { type: String, required:true },
    reportDate: { type: Number, required: true },
    history: [Object],
    fee:{type: Number,  required: true},
    images:[{type: String,}],
    status:{type:Number,required:true},
    createdBy:{type: ObjectId, required: true, ref: "user" },
    isHidden: { type: Boolean, required: true, default: false },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: Date.now() }
});

ReportSchema.statics = {
    createReport(report) {
        return this.create(report);
    },
    getListReport(){
        return this.find({ isHidden: false }).populate({path : ["idResponse createdBy",]}).sort({ status: 1, created_at: 1 }).exec();
    },
    getListReportByStatus(status){
        return this.find({ isHidden: false,status }).populate({path : "idResponse createdBy"}).sort({ created_at: 1 }).exec();
    },
    getReportByID(_id) {
        return this.findById(_id).populate({path : "idResponse createdBy"}).exec();
    },

    getListReportByEmployee(createdBy){
        return this.find({createdBy}).populate({path:"idResponse createdBy"})
    },

    getReportDetailByResponseID(idResponse){
        return this.find({idResponse}).populate({path:"idResponse createdBy"}).exec();
    },
    updateStatus(_id,status){
        return this.findOneAndUpdate({_id},{$set:{status}},{new:true}).exec();
    },

    updateReport (_id,report){
        return this.findOneAndUpdate({_id},{$set:report},{new:true})
    },
    
    hiddenReport(_id) {
        return this.updateOne({ _id }, { $set: { isHidden: true } }).exec();
    },

    deleteReport(_id) {
        return this.deleteOne({ _id }).exec();
    }
};

module.exports = mongoose.model("report", ReportSchema);

