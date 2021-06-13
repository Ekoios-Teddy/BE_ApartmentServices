const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ResponseSchema = new Schema({
    title: { type: String, required: true },
    id_apartment: { type: ObjectId, required: true, ref: "apartment" },
    id_requirementType: { type: ObjectId, required: true, ref: "requirement_type" },
    id_user: { type: ObjectId, required: true, ref: "user" },
    id_employee: { type: ObjectId, ref: "user" },
    content: { type: String, required: true },
    res_image: [String],
    status: { type: Number, default: 1, required: true },
    history: [Object],
    isReport:{type:Boolean,required:true,default:false},
    isHidden: { type: Boolean, required: true, default: false },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: Date.now() }
});

ResponseSchema.statics = {
    Create_Response(response) {
        return this.create(response);
    },

    findResponse() {
        return this.find({ isHidden: false }).populate("id_apartment").sort({ status: 1, created_at: 1 }).exec();
    },
    findResponseByStatus(status) {
        return this.find({ isHidden: false, status }).populate("id_apartment").sort({ updated_at: 1 }).exec();
    },
    findResponseByID(responseID) {
        return this.findById(responseID).exec();
    },

    findResponseByUserID(userID) {
        return this.find({ id_user: userID }).populate("id_apartment").sort({ status: 1, created_at: 1 }).exec();
    },
    findResponseByUserIDStatus(userID, status) {
        return this.find({ id_user: userID, status }).populate("id_apartment").sort({ created_at: 1 }).exec();
    },

    findResponseByEmployeeID(employeeID) {
        return this.find({ id_employee: employeeID }).populate("id_apartment").sort({ status: 1, created_at: 1 }).exec();
    },
    findResponseByEmployeeIDStatus(employeeID, status) {
        return this.find({ id_employee: employeeID, status }).populate("id_apartment").sort({ created_at: 1 }).exec();
    },
    findResponseDetailByID(responseID) {
        return this.findById(responseID).populate("id_apartment").populate({ path: "id_employee", populate: { path: "department_id" } })
            .populate("id_requirementType").populate("id_user").exec();
    },

    updateIsReport (_id){
        return this.updateOne({_id},{$set:{isReport:true}})
    },
    updateEmployeeForResponse(response) {
        return this.findOneAndUpdate({ _id: response._id }, {
            $set: {
                id_employee: response.id_employee,
                status: 2,
                history: response.history,
                updated_at: response.updated_at
            }
        }, { new: true }).exec();
    },
    updateResponseStatus(response) {
        return this.findOneAndUpdate({ _id: response._id },
            {
                $set: {
                    status: response.status,
                    history: response.history,
                    updated_at: response.updated_at
                }
            }, { new: true }).exec();
    },

    hiddenResponse(_id) {
        return this.updateOne({ _id }, { $set: { isHidden: true } }).exec();
    },

    deleteResponse(_id) {
        return this.deleteOne({ _id }).exec();
    }
};

module.exports = mongoose.model("response", ResponseSchema);

