class StudentService {
    constructor(db) {
        this.client = db.sequelize;
        this.Student = db.Student;
    }
    async get(id) {
        return await this.Student.findOne({
            where: {id: id}
        })
        .catch(function(err) {
            console.log(err);
        });
    }
    async create(FirstName, LastName, SchoolId) {
    return this.Student.create({
        FirstName,
        LastName,
        SchoolId
    }).catch(function(err) {
        console.log(err);
    });
    }
    async delete(id) {
        return this.Student.destroy({
            where: {id: id}
        }).catch(function(err) {
            console.log(err);
        });
    }
    async getAll() {
        return this.Student.findAll({
            where: {}
        }).catch(function(err) {
            console.log(err);
        });
    }
}

module.exports = StudentService;