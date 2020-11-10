const db = require("../database/dbConfig")

async function add(user){
    const [id] = await db("users").insert(user)
    return findByUserId(id)
}

async function findByUserId(id){
    return await db("users")
            .select("username", "id")
            .where("id",id)
            
            
            

}

// async function findBy(filter){
//     return db("users")
//         .select("id", "username")
//         .where(filter)
//         .first()
// }

// async function findBy(username){
//     return db("users")
//         .select("username")
//         .where("users.username", username)
//         .first(username)
        
        
// }

async function findBy(username){
    return db("users")
        .where("username", username)
        .first()
        
}

module.exports = {
    add,
    findBy,
    findByUserId

}