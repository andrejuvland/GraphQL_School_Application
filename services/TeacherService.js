class TeacherService {
    constructor(db) {
        this.client = db.sequelize;
        this.Teacher = db.Teacher;
    }
    async create(FirstName, LastName, SchoolId) {
        return this.Teacher.create({
            FirstName,
            LastName,
            SchoolId
        }).catch(function(err) {
            console.log(err);
        });
    }
    async get(id) {
        return this.Teacher.findOne({
            where: {id: id}
        });
    }
    async getAll() {
        return this.Teacher.findAll({
            where: {}
        });
    }
    async delete(id) {
        return this.Teacher.destroy({
            where: {id: id}
        });
    }
}

module.exports = TeacherService;