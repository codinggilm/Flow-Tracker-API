const {  Sequelize, DataTypes } = require("sequelize");

async function main() {
    const sequelize = new Sequelize('TEST', 'postgres', 'millionpg1.', {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    })


    // Models  *************************************************
    const Project = sequelize.define("Project", {
        title: {
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

    // const UserProjects = sequelize.define("UserProjects", {
    //     somedata: {
    //         type: DataTypes.DATE
    //     }
    // });

    // M-M *************************************************
    Project.belongsToMany(User, {through: "UserProjects"})
    User.belongsToMany(Project, {through: "UserProjects"})

    // await sequelize.sync({ force: true})


    // Dummy data **********************************************************
    // const testProject = await Project.create({
    //     name: "First Project"
    // })
    Project.create({
        title: "Third Project"
    })()


    // const testUser = await User.create({
    //     username: "Bobby"
    // })

    User.create({
        username: "Nick"
    })()

    // await newUser.newProject





    //  Query the M to M assocication

    // const users = await User.findAll();
    // console.log(users)

    // const users = await User.findAll({
    //     include: [Project]
    // });

    
    // users.forEach(user => { 
    //     console.log(user.Repositories[0].UserProjects.toJSON())
    // })

    // Find specific user of specific Repo
    // const association = await UserRepositories.findOne({
    //     where: {
    //         RepositoryId: 1,
    //         UserId: 1
    //     }
    // })
    // console.log(association.toJSON())
}


main();


// server.listen(process.env.PORT || 3000, () => {
//     console.log("server is running on port 3000")
// })