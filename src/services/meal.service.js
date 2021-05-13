const database = require("./database.service")

class meal {
    /**
     * @param {Object} meal - The new meal details
     * @param {string} meal.name - The name of the new meal
     * @param {string} meal.description - The description of the new meal
     * @param {string} meal.ingredients - The ingredients of the new meal
     * @param {number} meal.allergy - The allergies of the new meal
     * @param {string} meal.creationDate - The creation date of the new meal
     * @param {string} meal.serveDate - The serve date of the new meal
     * @param {string} meal.price - The price of the new meal
     * @param {string} meal.userId - The UserID the id of the home owner 
     * @param {string} meal.mealId - The ID of the new meal
     * @param {string} meal.maxParticipants - The maximum amount of participants for the new meal
     */
    async create(meal) {
        const newmeal = await database.execute(
            `INSERT INTO 'meal' 
                (
                    'Name', 
                    'Description', 
                    'Ingredients', 
                    'Allergies', 
                    'CreatedOn', 
                    'OfferedOn', 
                    'Price',
                    'UserID',
                    'StudentmealID',
                    'MaxParticipants'
                ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                meal.name,
                meal.description,
                meal.ingredients,
                meal.allergy,
                meal.creationDate,
                meal.serveDate,
                meal.price,
                meal.userId,
                meal.mealId,
                meal.maxParticipants
            ])

        return newmeal;
    }
}

