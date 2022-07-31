import { Model } from "./model";
import { View } from "./view";

export class Mixology {
    constructor(root){
        this.root = root;
        this.Model = Model;
        this.View = View;
    }
    init(){
        const mixRoot = this.root.getElementByClassName('mixologyID');
    }
}   