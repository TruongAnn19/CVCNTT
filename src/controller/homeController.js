import { json } from 'body-parser'
import db from '../models/index'
import { createNewUser, getAllUser, getUserById, updataUserData, deleteUserById } from '../sevices/CRUDServices'

export const getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }
}

export const getCRUD = async (req, res) => {
    return res.render('crud.ejs')
}

export const postCRUD = async (req, res) => {
    let message = await createNewUser(req.body)
    console.log(message)
    return res.send('welcome')
}

export const displayGetCRUD = async (req, res) => {
    let data = await getAllUser()
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

export const getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await getUserById(userId)
        return res.render('editCRUD.ejs', {
            user: userData
        })
    } else {
        return res.send('Can not found user')
    }

}

export const putCRUD = async (req, res) => {
    let data = req.body
    let allUser = await updataUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}

export const getDeleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await deleteUserById(id)
        return res.render('Xoá thành công')
    } else {
        return res.send('không tìm thấy user')
    }
}

