import {capitalize} from '@core/utils';
export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error("No $root provided for DomListener");
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDomListener() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            const err = `Not implemented ${listener} in ${this.name} element`;
            if (!this[method]) {
                throw new Error(err);
            }
            this[method] = this[method].bind(this);
            // Тоже самое что addEventListener
            this.$root.on(listener, this[method]);
        });
    }

    removeDomListener() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        });
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
}
