import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from '@/components/table/table.template';
import {shouldResize} from "@/components/table/table.functions";
import {resizeTable} from "@/components/table/table.event";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }
    toHTML() {
        return createTable();
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            resizeTable(event, this.$root);
        }
    }
}