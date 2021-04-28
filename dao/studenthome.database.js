module.exports = {
    db: [
        {
            id: 0,
            name: "mijn osso"
        },
    ],
    info: "database info",

    add(item, callback) {
        setTimeout(() => {
            this.db.push(item)
            callback("success", undefined)

        }, 500)
    },

    get(index, callback) {
     setTimeout(() => {
         const itemNotFound = true;
         if(itemNotFound) {
             callback(undefined, "error item not found")
         } else {
             callback({name: "item"}, undefined)
         }
     }, 500)    
    },

}

// database.add(movie, (result) => {
//     logger.debug("item add function was called")


//     }
// })