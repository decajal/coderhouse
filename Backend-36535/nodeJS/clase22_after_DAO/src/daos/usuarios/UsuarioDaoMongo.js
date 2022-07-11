const ContainerMongo = require('../../containers/ContainerMongo')
const userModel = require('../../models/usuarios')

class UserDaoMongo extends ContainerMongo {
	constructor(){
		super(userModel)
	}

	saveUser(user){
		this.save(user)	
		return user
	}

}

module.exports = { UserDaoMongo }
