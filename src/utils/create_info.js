
const create_Apartment = (tower_id, apartments_per_floor, floors, sign) => {
    let apartment = [];
    for (let i = 1; i <= floors; i++) {
        for (let j = 1; j <= apartments_per_floor; j++) {
            let tmpApart = {}
            tmpApart = {
                apm_name: j < 10 ? `${sign}${i}0${j}` : `${sign}${i}${j}`,
                apm_number: j < 10 ? `${i}0${j}` : `${i}${j}`,
                floor_number: i,
                tower_id: tower_id
            }
            apartment.push(tmpApart)
        }
    }
    return apartment
};
const _getCurrentDate = (yearLater) => {
    var now = new Date();
    var startOfDay = new Date(now.getFullYear() +yearLater, now.getMonth(), now.getDate());
    var timestamp = startOfDay / 1000;
    console.log('timestamp',timestamp)
    return timestamp;
};
module.exports = { create_Apartment,_getCurrentDate }