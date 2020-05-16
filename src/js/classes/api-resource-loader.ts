import axios from "axios";
import {ApiResource} from "./api-resource";

export class ApiResourceLoader {

    private readonly _resource: ApiResource;

    constructor(resource: ApiResource) {
        this._resource = resource;
    }

    load(callback: (content: string) => void): void {
        axios.get(this._resource.url)
            .then((response) => {
                callback(response.data);
            })
            .catch((e) => {
                console.log(e);
                alert("Cannot load a resource by url: " + this._resource.url);
            });
    }

}
