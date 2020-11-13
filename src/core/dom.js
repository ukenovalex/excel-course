class Dom {
    constructor(selector) {
        this.$el = typeof(selector) === 'string'
        ? document.querySelector(selector)
        : selector;
    }

    html(html) {
        if (typeof(html) === "string") {
            this.$el.innerHTML = html;
            return this
        } else {
            return this.$el.get.outerHTML.trim();
        }
    }
    clear() {
        this.html('');
        return this;
    }
    text(text) {
        if (typeof(text) !== 'undefined') {
            this.$el.textContent = text;
            return this;
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
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

    getStyles(styles =[]) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
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
        return this;
    }

    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }

    focus() {
        this.$el.focus();
        return this;
    }
    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value);
            return this;
        }
        return this.$el.getAttribute(name);
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
