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

async function finditDamn(username){
    return db("users")
        .where("username", username)
        .first(users.id)
}



//Error: select `Dean` as `username` from `users` - 
// SQLITE_ERROR: no such column: Dean
// async function finditDamn(filter){
//     return db("users")
//         .select(filter)
        //.where("id", id)
//}


// this one returns: "Illegal arguments: string, undefined"
// async function finditDamn(username){
//     return db("users")
//         .select("username", "id")
//         .where("username", username)
// }

module.exports = {
    add,
    findBy,
    findByUserId,
    finditDamn

}