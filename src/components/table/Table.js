import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from '@/components/table/table.template';
import {shouldResize, isCell} from "@/components/table/table.functions";
import {resizeTable} from "@/components/table/table.event";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";
import {matrix} from "@/components/table/table.functions";
import {nextSelector} from "@/components/table/table.functions";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown'],
            ...options
        });
    }
    toHTML() {
        return createTable();
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selection.select($cell);
        this.emitter.subscribe('it is working', (text) => {
            this.selection.current.text(text);
            console.log("From table", text);
        });
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            resizeTable(event, this.$root);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                const cells = matrix($target, this.selection.current)
                .map((id) => {
                    return this.$root.find(`[data-id="${id}"]`);
                });
                this.selection.selectGroup(cells);
            } else {
                this.selection.select($target);
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
            this.selection.select($next);
        }
    }
}

