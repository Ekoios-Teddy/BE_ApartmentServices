var express = require('express');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var morgan = require("morgan");
var cors = require("cors");

const { connectMongodb } = require('./src/connections')
const { employeeRouter, adminRouter, residentRouter, generalRouter } = require('./src/routes');
const app = express();
const PORT = process.env.PORT || 2021;

connectMongodb();

app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());

app.use("/uploads", express.static(__dirname + '/public/uploads'));

app.get("/", (req, res) => res.send("It's working!"));

// app.use(_checkAuthen);
app.use("/", generalRouter);
//admin
app.use("/admin", adminRouter);

//employees
app.use('/employee', employeeRouter);

//resident
app.use('/resident', residentRouter);
//listen PORT 
app.listen(PORT, function () {
    console.log('Your app running on port ' + PORT)
})
