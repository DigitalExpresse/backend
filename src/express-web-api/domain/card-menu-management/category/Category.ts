export class Category {
    _id?: number;
    name: string;
    parentId?: number;

    constructor(name: string, parentId?: number, id?: number) {
        this._id = id;
        this.name = name;
        this.parentId = parentId;
    }
}