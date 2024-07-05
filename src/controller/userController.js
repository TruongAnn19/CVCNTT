import {
    handleUserLogin, getAllUsers, createNewUser,
    deleteUser, updateUserData, getAllCodeService
} from "../sevices/userServices"

export const handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!',
            users: []
        })
    }
    let userData = await handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

export const handleGetAllUsers = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramentes',
            users: []
        })
    }
    let users = await getAllUsers(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        users
    })
}

export let handleCreateNewUser = async (req, res) => {
    let message = await createNewUser(req.body)
    return res.status(200).json(message)
}

export let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await updateUserData(data)
    return res.status(200).json(message)
}

export let handleDeleteUser = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Không tìm thấy '
        })
    }
    let message = await deleteUser(id)
    return res.status(200).json(message)
}

export let getAllCode = async (req, res) => {
    try {
        setTimeout(async () => {
            let data = await getAllCodeService(req.query.type)
            return res.status(200).json(data)
        }, 1000)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Server'
        })
    }
}