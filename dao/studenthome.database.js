module.exports = {
    db: [
        {
            id: 0,
            name: "mijn osso"
        },
    ],
    info: "database info",

    add(item, callback) {
        this.db.push(item)
        if (callback !== undefined) {
            callback("success", undefined)
        }
    },

    get(index, callback) {
        if (callback !== undefined) {
            callback(undefined, "error item not found")
        }
    },

}

// database.add(movie, (result) => {
//     logger.debug("item add function was called")


//     }
// })