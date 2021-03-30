const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');







module.exports = function(passport) {
	// passport.use('local-signup', new LocalStrategy(
	passport.use( 'local', new LocalStrategy( (username, password, done) => {
	// passport.use( 'local', new LocalStrategy(
		// {
		// 	usernameField: 'username',
		// 	passwordField: 'password',
		// 	passReqToCallback: true // allows us to pass back the entire request to the callback
	 
		// },
		
		User.findOne({
			where: {
				// email: req.body.email
				// username: req.body.username
				username: username
			}
		})
		.then( user => { 
			if (!user) {
				// console.log('There is no such user in our database')
				return done(null, false, { message: 'Incorrect username.' });
			}

			if (bcrypt.compareSync(password, user.dataValues.password) && username === user.dataValues.username) {
				// console.log('success!')
				return done(null, user);
			} else {
				console.log('nu huh')
				return done(null, false, { message: 'Incorrect password.' })
			}
		
		
		})


		passport.serializeUser((user, done) => {
			done(null, user.id)
		})
			
		passport.deserializeUser((id, done) => {

			User.findOne({
				where: {id: id}
			})
			.then(user => done(user))
			.catch(err => done(err))
		})

	}));
}
























// module.exports = function(passport) {


    // passport.use(
    //     new LocalStrategy((username, password, done) => {
    //         User.findOne({
	// 			where: {username: username}
	// 		}) 
	// 		.then((err, user) => {
    //             if (err) {
	// 				throw err
	// 			} else if (!user){
	// 				return done(null, false);
	// 			} else {
	// 				bcrypt.compare(password, user.password, (err, result) => {
	// 					if (err) throw err;
	// 					if (result === true) {
	// 						return done(null, user);
	// 					} else {
	// 						return done(null, false);
	// 					}
	// 				})
	// 			}
    //         })
//             // User.findOne({where: {username: username}}), (err, user) => {
//             //     if (err) throw err;
//             //     if (!user) return done(null, false);
//             //     bcrypt.compare(password, user.password, (err, result) => {
//             //         if (err) throw err;
//             //         if (result === true) {
//             //             return done(null, user);
//             //         } else {
// 			// 			return done(null, false);
// 			// 		}
//             //     })
//             // }
//         })
//     )

// 	passport.serializeUser((user, cb) => {
// 		cb(null, user.id)
// 	})

// 	passport.deserializeUser((id, cb) => {
// 		User.findOne({_id: id}, (err, user) => {
// 			cb(err, user)	
// 		})
// 	})
// }






















// function initialize(passport, getUserByEmail) {
    
//     const authenticateUser = async (email, password, done) => {
//         const user = getUserByEmail(email);
//         if (user == null) {
//             return done(null, false, {message: 'No user with that email'})
//         }

//         try {
//             if (await bcrypt.compare(password, user.password)) {
//                 return done(null, user)
//             } else {
//                 return done(null, false, {message: 'Wrong password'})
//             }
//         } catch (err){
//             done(err)
//         }
//     }

//     passport.use(
//         new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, 
//         authenticateUser)
//     )

//     passport.serializeUser((user, done) => {done(null, usder.id)})

//     passport.deserializeUser((id, done) => {
//         return done(null, getUserById(id))
//     })
// }



// module.exports = initialize;