module.exports = {
    db: [
        {
            id: 0,
            name: "mijn osso",
            city: "gamer-city"
        },
        {
            id: 1,
            name: "mijn osso",
            city: "gamer-city"
        },
        {
            id: 2,
            name: "mijn osso",
            city: "gamer-city"
        },
        {
            id: 3,
            name: "hobo osso",
            city: "gamer-city"
        },
        {
            id: 4,
            name: "programmer osso",
            city: "programmer-city"
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