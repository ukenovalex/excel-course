export class Emitter {
    constructor() {
        this.listeners = {};
    }
    // Уведомляем слушателей если они есть
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false;
        }
        this.listeners[event].forEach((listener) => {
        listener(...args);
        });
        return true;
    }

    // Подписываемся на уведомление
    // Добовляем нового слушателя
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return () => {
            this.listeners[event] = this.listeners[event]
            .filter((listener) => {
                listener !== fn;
            });
        }
    }
}


// Example
// const emitter = new Emitter();

// const unsub = emitter.subscribe("eventing", (data) => {
//     console.log(data);
// });

// setTimeout(() => {
//     emitter.emit("eventing", "After 2 second")
// }, 2000);
// setTimeout(() => {
//     unsub();
// }, 3000);
// setTimeout(() => {
//     emitter.emit("eventing", "After 4 second")
// }, 4000);
