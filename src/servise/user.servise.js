const { getAllDataDB, getAllDataByIdDB, createUserDB, updateUsersDB, deleteUsersDB } = require('../repository/user.repository')

async function getAllData() {
    const data = await getAllDataDB()
    return data
}

async function getAllDataById(id) {
    const data = await getAllDataByIdDB(id)
    return data
}

async function createUser(birth,city,age,name,surname){
    const data = await createUser(birth,city,age,name,surname)
    return data
}

async function updateUsers(id,birth,city,age,name,surname ){
    const data = await createUser(id,birth,city,age,name,surname)
    return data  
}

async function deleteUsers(id) {
    const data = await deleteUsersDB(id)
    return data
}

module.exports = { getAllData, getAllDataById, createUser, updateUsers, deleteUsers }