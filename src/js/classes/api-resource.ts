export class ApiResource {

    private readonly _object: string;
    private readonly _path: string;

    constructor(object: string, path: string) {
        this._object = object;
        this._path = path;
    }

    get object(): string {
        return this._object;
    }

    get path(): string {
        return this._path;
    }

    get key(): string {
        return this.object + "/" + this.path;
    }

    get url(): string {
        return "resources/data/" + this.key;
    }

}
