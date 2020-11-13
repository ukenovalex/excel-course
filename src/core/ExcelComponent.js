import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || "";
        this.emitter = options.emitter;
        this.subscribe = options.subscribe || [];
        this.store = options.store;
        this.unsubscribes = [];
        this.prepare();
    }
    // Настраиваем наш компонент до init()
    prepare() {}

    // Возвращает шаблон компонента
    toHTML() {
        return "";
    }
    // Уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }
    // Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribes.push(unsub);
    }
    $dispatch(action) {
        this.store.dispatch(action)
    }
    // Сюда приходят только изменения по тем полям на которые мы подписались
    storeChanged() {}
    isWatching(key) {
        return this.subscribe.includes(key);
    }
    // Инициализируем компонент
    // Добовяем слушатели
    init() {
        this.initDomListener();
    }
    // Удаляем компонент
    // Чистим слушатели
    destroy() {
        this.removeDomListener();
        this.unsubscribes.forEach((unsub) => {
            unsub();
        });
    }
}
