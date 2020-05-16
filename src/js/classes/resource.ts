export class Resource {

    private readonly _keyword: string;
    private readonly _value: string;

    constructor(keyword: string, value: string) {
        this._keyword = keyword;
        this._value = value;
    }

    get keyword(): string {
        return this._keyword;
    }

    get value(): string {
        return this._value;
    }

}
