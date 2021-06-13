const ApartmentController = require('./ApartmentController');
const UserController = require('./UserController');
const AuthenController = require('./AuthenController');
const NotificationController = require('./NotificationController');
const RequirementTypeController = require('./RequirementTypeController');
const ResponseController = require('./ResponseController');
const DepartmentController = require('./DepartmentController');
const TowerController = require('./TowerController');
const ReportController = require('./ReportController');

module.exports = {
    adminApartment: ApartmentController,
    adminUser: UserController,
    adminAuthen: AuthenController,
    adminNotify: NotificationController,
    adminRqmType: RequirementTypeController,
    adminResponse: ResponseController,
    adminDepartment: DepartmentController,
    adminTower: TowerController,
    adminReport :ReportController
}