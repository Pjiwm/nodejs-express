module.exports = {
    db: [
        {
            id: 0,
            name: "mijn osso",
            city: "gamer-city",
            meals: []
        },
        {
            id: 1,
            name: "mijn osso",
            city: "gamer-city",
            meals: []
        },
        {
            id: 2,
            name: "mijn osso",
            city: "gamer-city",
            meals: []
        },
        {
            id: 3,
            name: "hobo osso",
            city: "gamer-city",
            meals: []
        },
        {
            id: 4,
            name: "programmer osso",
            city: "programmer-city",
            meals: []
        },
        {
            id: 5,
            name: "hype house",
            city: "boomer-town",
            meals: [{
                id: 1,
                name: "paprika",
                type: "gezond"
            }]
        }
    ],
    info: "database info",

    // add(item, callback) {
    //     this.db.push(item)
    //     if (callback !== undefined) {
    //         callback("success", undefined)
    //     }
    // },

    // get(index, callback) {
    //     if (callback !== undefined) {
    //         callback(undefined, "error item not found")
    //     }
    // },

    createHome(_home) {
        let id
        if (!this.db.length) {
            id = 0
        } else {
            id = this.db[this.db.length - 1].id + 1
        }

        const newHome = { ..._home, id }
        this.db.push(newHome)

        return newHome
    },

    updateHome(_homeId, _newHome) {
        const currentHome = this.getHome(_homeId)[0]
        const newHome = { ...currentHome, ..._newHome }
        const homeIndex = this.db.indexOf(currentHome)
        this.db[homeIndex] = newHome
        return newHome
    },

    removeHome(_homeId) {
        const home = this.getHome(_homeId)
        const homeIndex = this.db.indexOf(home)
        this.db.splice(homeIndex, 1)
    },

    getHome(_id) {
        return this.db.filter(home => home.id === Number(_id))
    },

    getHomeByNameAndCity(_name, _city) {
        return this.db.filter(home => home.name === _name && home.city === _city)
    },

    getMeal(_homeId, _mealId) {
        return this.getHome(Number(_homeId))[0].meals.filter(meal => meal.id === Number(_mealId))
    },

    removeMeal(_homeId, _mealId) {
        homeId = Number(_homeId)
        mealId = Number(_mealId)
        const meal = this.getMeal(homeId, mealId);
        const mealIndex = this.getHome(mealId)[0].meals.indexOf(meal);

        this.getHome(homeId)[0].meals.splice(mealIndex, 1)
    },

    createMeal(_homeId, _meal) {
        let id
        const home = this.getHome(_homeId)[0]
        if (!home.meals.length) {
            id = 0
        } else {
            id = home.meals[home.meals.length - 1].id + 1
        }
        const newMeal = {..._meal, id}
        home.meals.push(newMeal)
        return newMeal
    },

    updateMeal(_homeId, _mealId, _newMeal) {
        const currentMeal = this.getMeal(_homeId, _mealId)[0]
        const mealIndex = this.getHome(_homeId)[0].meals.indexOf(currentMeal)
        
        this.getHome(_homeId)[0].meals[mealIndex] = _newMeal
        console.log('h:', this.getHome(_homeId))
        console.log('m:', currentMeal)
        console.log('mi:', mealIndex)
        console.log('nm:', this.getHome(_homeId)[0].meals[mealIndex])
        return _newMeal
    }

}


// database.add(movie, (result) => {
//     logger.debug("item add function was called")


//     }
// })