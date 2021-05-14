const database = require("./database.service")
class Home {
    /**
     * @param {Object} home - The new home details
     * @param {string} home.name - The name of the new home
     * @param {string} home.street - The street address of the new home
     * @param {string} home.streetNumber - The streetNumber of the new house
     * @param {number} home.userId - The UserID the id of the home owner
     * @param {string} home.zipcode - The zipcode of the new home
     * @param {string} home.phoneNumber - The phonenumber of the new home
     * @param {string} home.city - The city of the new home
     */
    async create(home) {
        const newHome = await database.execute(
            "INSERT INTO `studenthome` (`Name`, `Address`, `House_Nr`, `UserID`, `Postal_Code`, `Telephone`, `City`) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                home.name,
                home.street,
                home.streetNumber,
                home.userId,
                home.zipcode,
                home.phoneNumber,
                home.city
            ])
        return await this.findOne(newHome.insertId)
    }

    /**
     * @param {number} id - ID of the home
     */
    async findOne(id) {
        return await database.execute("SELECT * FROM `studenthome` WHERE id = ?", [id])
    }

    async findAll() {
        return await database.execute("SELECT * FROM `studenthome`")
    }

    /**
     * @param {Object} query - The query given with the url
     * @param {string} query.city - the city to look for within the url
     * @param {string} query.name - the name to look for within the url
     */
    async findByNameAndCity(query) {
        const homes = await database.execute("SELECT * FROM `studenthome` WHERE City = ? OR Name = ?",
            [
                query.city,
                query.name
            ])
        return homes
    }

    /**
     * @param {string} postalcode - The postalcode from a home
     */
    async findByPostalCodeAndStreetNumber(postalCode, streetNumber) {
        return await database.execute("SELECT * FROM `studenthome` WHERE Postal_Code = ? AND House_Nr = ?", [postalCode, streetNumber])
    }

    /**
     * @param {string} city - The city given with the url
     */
    async findByCity(city) {
        return await database.execute("SELECT * FROM `studenthome` WHERE City = ?", [city])
    }

    /**
     * @param {string} name - the name to look for within the url
     */
    async findByName(name) {
        return await database.execute("SELECT * FROM `studenthome` WHERE Name = ?", [name])
    }

    /**
     * @param {number} id - The id of the home
     * @param {Object} home - The updated home details
     * @param {string} home.name - The name of the updated home
     * @param {string} home.street - The street address of the updated home
     * @param {string} home.streetNumber - The streetNumber of the updated house
     * @param {number} home.userId - The UserID the id of the home owner
     * @param {string} home.zipcode - The zipcode of the updated home
     * @param {string} home.phoneNumber - The phonenumber of the updated home
     * @param {string} home.city - The city of the updated home
     */
    async update(id, home) {
        await database.execute("UPDATE `studenthome` SET `Name` = ?, `Address` = ?, `House_Nr` = ?, `UserID` = ?, `Postal_Code` = ?, `Telephone` = ?, `City` = ? WHERE ID = ?",
            [
                home.name,
                home.street,
                home.streetNumber,
                home.userId,
                home.zipcode,
                home.phoneNumber,
                home.city,
                id
            ])
        return await this.findOne(id)
    }
    
    /**
     * @param {number} id - ID of the home
     */
    async removeFromId(id) {
        await database.execute("DELETE FROM `meal` WHERE StudentHomeID = ?",[id])
        await database.execute("DELETE FROM `studenthome` WHERE id = ?", [id])
    }
}
module.exports = new Home()
