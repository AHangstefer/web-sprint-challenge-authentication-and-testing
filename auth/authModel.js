const db = require("../database/dbConfig")

async function add(user){
    const [id] = await db("users").insert(user)
    return findBy(id)
}

// async function findBy(filter){
//     return db("users")
//         .select("id", "username")
//         .where(filter)
//         .first()
// }

async function findBy(username){
    return db("users")
        .select("username")
        .where("users.username", username)
        
        
}

module.exports = {
    add,
    findBy

}