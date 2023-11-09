const express = require('express')
const { getAllData, getAllDataById, createUser,updateUsers, deleteUsers } = require('../servise/user.servise')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const data = await getAllData()
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }

})

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const data = await getAllDataById(id)
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }
})

router.post('/',async (req,res)=>{
    try{
        const {birth,city,age,name,surname} = req.body;
        const data = await createUser()
        res.status(201).send(data)
    }catch(er){
        res.status(200).send(er.message)
    }
})

router.put('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const {birth,city,age,name,surname} = req.body;
        const data = await updateUsers(birth,city,age,name,surname,id)
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }
})

router.delete('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await deleteUsers(id)
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }
})
module.exports = router;