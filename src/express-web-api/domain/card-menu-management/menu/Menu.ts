export class Menu {

    private readonly _id: string;
    private readonly _name: string;
    private readonly _price: number;
    private readonly _description?: string;

    constructor(name, price, description, id?) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._description = description;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    get description() {
        return this._description;
    }
}