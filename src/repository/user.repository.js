const pool = require('../db')

async function getAllDataDB() {
    const client = await pool.connect();
    const sql = `select * from users_info
    join users
    on users_info.id = users.info_id`

    const result = (await client.query(sql)).rows

    return result
}

async function getAllDataByIdDB(id) {
    const client = await pool.connect();
    const sql = `select * from users_info
    join users
    on users_info.id = users.info_id
    where users.id=$1`

    const result = (await client.query(sql, [id])).rows
    return result
}

async function createUserDB(birth, city, age, name, surname) {
    const client = await pool.connect()

    const sql1 = `insert into users_info(birth,city,age)
    values ($1,$2,$3) returning`
    const data1 = (await client.query(sql1, [birth, city, age, name, surname])).rows

    const sql2 = `insert into users (name,surname,info_id)
    values ($1,$2,$3) returning`

    const data2 = (await client.query(sql2, [name, surname], data1[0].id)).rows

    return [{ ...data1[0], ...data2[0] }]
}

async function updateUsersDB(birth, city, age, name, surname, id) {
    const client = await pool.connect();
    const sql_1 = `update users_info set birth =$1, city =$2, age =$3
    returning`
    const data_1 = (await client.query(sql_1, [birth, city, age, id])).rows

    const sql_2 = `update users set name =$1, surnmae =$2, info_id =$3
    where users.id=$4 returning`
    const data_2 = (await client.query(sql_2, [name, surname, id])).rows

    return [{ ...data_1[0], ...data_2[0] }]
}

async function deleteUsersDB(id) {
    const client = await pool.connect();
    const sql1 = `delete from users_info where id=$1 returning`
    const data1 = (await client.query(sql, [id])).rows

    const sql2 = `delete from users_info where id=$1 returning`
    const data2 = (await client.query(sql, [id])).rows

    return {...data1[0],...data2[0]};
}

module.exports = { getAllDataDB, getAllDataByIdDB, createUserDB, updateUsersDB, deleteUsersDB };