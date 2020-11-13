export class Page {
    constructor(params) {
        this.params = params
    }
    getRoot() {
        throw new Error('getRoot() is not implemented');
    }

    afterRender() {}

    destroy() {}
}