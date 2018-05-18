import uuid from 'uuid/v4';

export default class Client{
    constructor(){
        this.id = uuid();
    }
}