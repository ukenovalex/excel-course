import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from '@/components/table/table.template';
import {shouldResize, isCell} from "@/components/table/table.functions";
import {resizeTable} from "@/components/table/table.event";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";
import {defaultStyles} from "@/constants"
import {matrix} from "@/components/table/table.functions";
import {nextSelector} from "@/components/table/table.functions";
import * as actions from "@/redux/actions";
import {parse} from "@core/parse";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }
    toHTML() {
        return createTable(20, this.store.getState());
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        this.selectCell(this.$root.find('[data-id="0:0"]'));
        this.$on('formula:input', (value) => {
            if (value[0] === '=' && value[1]) {
                this.selection.current
                .attr('data-value', value)
                .text(parse(value));
                this.updateTextInStore(value);
            } else {
                this.selection.current.text(value);
                this.updateTextInStore(value);
            }
        });
        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
        this.$on('toolbar:applyStyle', (value) => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        });
    }


    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.$dispatch(actions.changeStyles(styles));
    }

    async resizeHandler(event) {
        try {
            const data = await resizeTable(event, this.$root);
            this.$dispatch(actions.tableResize(data));
        } catch (error) {
            console.error("Resize promise error data ", error.message);
        }
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeHandler(event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                const cells = matrix($target, this.selection.current)
                .map((id) => {
                    return this.$root.find(`[data-id="${id}"]`);
                });
                this.selection.selectGroup(cells);
            } else {
                this.selectCell($target);
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ];

        const {key} = event;

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(key, id));
            this.selectCell($next);
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }));
    }

    onInput(event) {
        const text = $(event.target).text();
        this.updateTextInStore(text);
        this.$emit('table:input', text);
    }
}

