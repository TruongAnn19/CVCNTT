import bcrypt from 'bcryptjs'
import db from '../models/index'

var salt = bcrypt.genSaltSync(10);



export const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassworFrombcryptjs = await hashUserPass(data.password)
            await db.User.create({
                email: data.email,
                password: hashPassworFrombcryptjs,
                firstName: data.fisrtname,
                lastName: data.lastname,
                address: data.Address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('Create user succeed !')
        } catch (e) {
            reject(e)
        }
    })


}

export const hashUserPass = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

export const getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll()
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

export const getUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })

            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

export const updataUserData = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save()

                let allUser = await db.User.findAll()
                resolve(allUser)
            } else {
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}


export const deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await db.User.destroy({
                    where: { id: userId }
                })
            }
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}