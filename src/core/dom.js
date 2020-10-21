class Dom {
    constructor(selector) {
        this.$el = typeof(selector) === 'string'
        ? document.querySelector(selector)
        : selector;
    }

    html(html) {
        if (typeof(html) === "string") {
            this.$el.innerHTML = html;
        } else {
            return this.$el.get.outerHTML.trim();
        }
    }
    text(text) {
        this.$el.textContent = text;
    }

    clear() {
        this.html('');
        return this;
    }
    on(eventType, callBack) {
        this.$el.addEventListener(eventType, callBack);
    }
    off(eventType, callBack) {
        this.$el.removeEventListener(eventType, callBack);
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }
        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    get data() {
        return this.$el.dataset;
    }

    get classList() {
        return this.$el.classList;
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    css(styles = {}) {
        Object.keys(styles).forEach((key) => {
            this.$el.style[key] = styles[key];
        });
    }

    id(parsed) {
        if (parsed) {
            const parser = this.id().split(':');
            return {
                row: +parser[0],
                col: +parser[1]
            }
        }
        return this.data.id
    }

    addClass(className) {
        this.$el.classList.add(className);
    }

    removeClass(className) {
        this.$el.classList.remove(className);
    }

    focus() {
        this.$el.focus();
        return this;
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
}
