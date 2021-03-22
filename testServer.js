const {  Sequelize, DataTypes } = require("sequelize");

async function main() {
    const sequelize = new Sequelize('Flow-Tracker', 'postgres', 'millionpg1.', {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    })


    // Models  *************************************************
    const Repository = sequelize.define("Repository", {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    });

    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: true
        }
    });

    const UserRepositories = sequelize.define("UserRepositories", {
        expirationDate: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    });

    // M-M
    Repository.belongsToMany(User, {through: "UserRepositories"})
    User.belongsToMany(Repository, {through: "UserRepositories"})

    await sequelize.sync({ force: true})

    // Dummy data
    const testRepo = await Repository.create({
        name: "test repo"
    })

    const testUser = await User.create({
        username: "Jon"
    })

    await testUser.addRepository(testRepo)





    //  Query the M to M assocication

    const users = await User.findAll({
        include: [Repository]
    });

    // users.forEach(user => { 
    //     console.log(user.Repositories[0].UserRepositories.toJSON())
    // })

    // Find specific user of specific Repo
    const association = await UserRepositories.findOne({
        where: {
            RepositoryId: 1,
            UserId: 1
        }
    })
    console.log(association.toJSON())
}

main();



// server.listen(process.env.PORT || 3000, () => {
//     console.log("server is running on port 3000")
// })


// Project and Ticket

Project.hasMany(Ticket);
Ticket.belongsTo(Project);


// Project and User
Project.belongsToMany(User, {through: "UserProjects"});
User.belongsToMany(Project, {through: "UserProjects"});


// Ticket and User(Dev?)
User.hasMany(Ticket);
Ticket.belongsTo(User);

User.belongsToMany(Ticket, {through: "UserTickets"});
Ticket.belongsToMany(User, {through: "UserTickets"});

