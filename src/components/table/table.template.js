import {toInlineStyles} from "@core/utils";
import {defaultStyles} from '@/constants'
import {parse} from "@core/parse";

const CODES = {
    A: 65,
    Z: 90
}
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
    const value = state ? state[index] : DEFAULT_WIDTH;
    return value + 'px';
}

function getHeight(state, index) {
    const value = state ? state[index] : DEFAULT_HEIGHT;
    return value + 'px';
}

function toCell(state, row) {
    return function(_, col) {
        const width = getWidth(state.colState, col);
        const id = `${row}:${col}`;
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        });
        const data = state.dataState[id];
        return `
            <div class="cell" 
                 contenteditable 
                 data-type="cell" 
                 data-col="${col}"
                 data-id="${id}"
                 data-value="${data || ''}"
                 style="${styles}; width: ${width}"
            >${parse(data) || ''}</div>
        `
    }
}

function toColumn({col, index, width}) {
    return `
        <div 
        class="column" 
        data-type="resizable" 
        data-col="${index}" 
        style="width: ${width}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function createRow(content, index, state) {
    const resizer = index
    ? `<div class="row-resize" data-resize="row"></div>` : '';
    const height = getHeight(state, index);
    return `
    <div 
        class="row"
        data-type="resizable"
        data-row="${index}"
        style="height: ${height}">
        <div class="row-info">
            ${index ? index : ''}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 30, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('');
    rows.push(createRow(cols));
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row, state.dataState))
        .join('');
        rows.push(createRow(cells, row + 1, state.rowState));
    }
    return rows.join('');
}
