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
}

module.exports = StudentService;