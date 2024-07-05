import express from "express"
import {
    getHomePage, getCRUD, postCRUD, displayGetCRUD, getEditCRUD,
    getDeleteCRUD, putCRUD,

} from "../controller/homeController"
import {
    handleLogin, handleGetAllUsers, handleCreateNewUser, handleEditUser,
    handleDeleteUser, getAllCode
} from "../controller/userController"

let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/homepage', getHomePage)
    router.get('/crud', getCRUD)
    router.get('/get-crud', displayGetCRUD)
    router.get('/edit-crud', getEditCRUD)
    router.get('/delete-crud', getDeleteCRUD)

    router.get('/api/get-All-Users', handleGetAllUsers)

    router.get('/api/allcode', getAllCode)

    router.post('/post-crud', postCRUD)
    router.post('/put-crud', putCRUD)
    router.post('/api/login', handleLogin)
    router.post('/api/create-new-user', handleCreateNewUser)
    router.put('/api/eidt-user', handleEditUser)
    router.delete('/api/delete-user', handleDeleteUser)



    return app.use("/", router)
}




module.exports = initWebRoutes