/*
* Database contains of already existing dummy data and CRUD 
* functionality for homes and meals.
*/
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


    createHome(_home) {
        let id
        if (!this.db.length) {
            id = 0
        } else {
            id = this.db[this.db.length - 1].id + 1
        }
        /*
        *   checks Dutch postalcode via regex. Both phones at home and mobile phones have each 10 digits.
        *   To not overcomplicate things country codes are not accepted, since the phonenumber will likely by a 
        */
        if (this.validateHome(_home)) {
            const newHome = { ..._home, id }
            this.db.push(newHome)

            return newHome
        } else {
            return undefined
        }
    },

    updateHome(_homeId, _newHome) {
        if (this.validateHome(_newHome)) {
            const currentHome = this.getHome(_homeId)[0]
            const newHome = { ...currentHome, ..._newHome }
            const homeIndex = this.db.indexOf(currentHome)
            this.db[homeIndex] = newHome
            return newHome
        } else {
            return undefined
        }
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

    validateHome(_home) {
        const phoneNumberLength = _home.phoneNumber.length
        const existingHome = this.db.filter(home => home.name === _home.name)
        if (/^[1-9][0-9]{3} ?[A-Z]{2}$/.test(_home.zipcode) && phoneNumberLength === 10 && !existingHome.length) {
            return true
        } else {
            return false
        }
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
        const newMeal = { ..._meal, id }
        home.meals.push(newMeal)
        return newMeal
    },

    updateMeal(_homeId, _mealId, _newMeal) {
        const currentMeal = this.getMeal(_homeId, _mealId)[0]
        const mealIndex = this.getHome(_homeId)[0].meals.indexOf(currentMeal)
        this.getHome(_homeId)[0].meals[mealIndex] = _newMeal
        return _newMeal
    }

}
