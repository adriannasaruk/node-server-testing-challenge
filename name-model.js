const db = require("./dbConfig")

module.exports = {
    get,
    insert,
    remove

};

function get () {
    return db("names")
}

async function insert(names) {
    return db("names").insert(names)
}

function remove(id) {
    return db("names").where({id}).del()
}
