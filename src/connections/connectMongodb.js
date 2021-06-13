const mongoose = require('mongoose');
const connectMongodb = () => {
    try {
        mongoose.set("useCreateIndex", true);
        mongoose.connect(
            "mongodb+srv://haidangcnm15:thachxa1@cluster0.ewsq9.mongodb.net/apartment_management?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
            .then(() => console.log("connect DB sucessfully"))
    } catch (error) {
        console.log(`Error connect DB: ${error.message}`);
    }

    // mongoose.Promise = global.Promise;
    // mongoose.connect('mongodb://localhost:27017/mtaboutique')
};
module.exports = connectMongodb;