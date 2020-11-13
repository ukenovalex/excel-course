export class TableSelection {
    static className = "selected";
    constructor() {
        this.group = [];
        this.current = null;
    }
    select($el) {
        this.clearArray();
        this.group.push($el);
        this.current = $el;
        $el.focus().addClass(TableSelection.className);
    }

    clearArray() {
        this.group.forEach((el) => {
            el.removeClass(TableSelection.className);
        });
        this.group = [];
    }

    selectGroup($group = []) {
        this.clearArray();
        this.group = $group;
        this.group.forEach((cel) => cel.addClass(TableSelection.className));
    }

    applyStyle(style) {
        this.group.forEach(($el) => $el.css(style));
    }

    get selectedIds() {
        return this.group.map(($el) => $el.id())
    }
}