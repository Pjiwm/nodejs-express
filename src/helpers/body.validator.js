module.exports = class BodyValidator {
    constructor(_types) {
        this.types = _types
        this.errors = []
    }

    validate(_body) {

        for (let key in this.types) {
            
            if (_body[key] === undefined) {
                this.errors.push(`${key} is required`)
                continue
            }

            if (this.types[key].toLowerCase() !== _body[key].constructor.name.toLowerCase()) {
                this.errors.push(`${key} must be a ${this.types[key]}`)
            }
        }

        return this.errors.length ? false : true
    }
}