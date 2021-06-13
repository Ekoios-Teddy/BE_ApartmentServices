const check_PhoneNumber = (phone_number) => {
    var realPhoneNumber = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (phone_number.match(realPhoneNumber)) {
        return true;
    }
    else {
        return false;
    }
};

const check_Email = (email) => {
    var realEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email.match(realEmail)) {
        return (true);
    }
    else {
        return (false);
    }
};
const check_Password = (password) => {
    var realPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;
    if (password.match(realPassword)) {
        return true
    } else {
        return false
    }
};

const check_Timestamp = (timestamp) => {
    if (timestamp >= -2208988800000 && timestamp < Date.now()) return true;
    else return false;
};

const getName_ImageFront = (data) => {
    console.log('data', data)
    let type = data.mimetype.split("/");
    let date = new Date();
    return `avatarImage_${date.getTime()}.${type[1]}`
};

const checkRole = (role) => {
    if (role == 1 || role == 1024 || role == 2048) return true;
    else return false
};

const checkStatusResponse = (oldRes, newRes) => {
    console.log('alo', oldRes, newRes)
    if (oldRes !== 6 && oldRes !== 1 && newRes > 2 && newRes < 6
        && (newRes - oldRes == 1 || newRes == oldRes)) {
        return true
    } else {
        return false
    }
};

const checkStatus = (value) => {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10)) && value > 0 && value < 7;
}

const check_Interger = (value) => {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
};

module.exports = {
    checkRole, check_PhoneNumber, check_Email, getName_ImageFront,
    check_Timestamp, check_Password, checkStatusResponse,
    checkStatus, check_Interger
}