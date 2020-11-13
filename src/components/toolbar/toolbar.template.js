function toButton(button) {
    const meta = `
        data-type="button"
        data-value='${JSON.stringify(button.value)}'
    `;
    return `
        <div 
        class="button ${button.active ? 'active' : ''}" 
        ${meta}>
            <i 
            class="material-icons"
            ${meta}>${button.icon}</i>
        </div>
    `;
}


export function createToolbar(state) {
    const isBold = state['fontWeight'] === 'bold';
    const isItalic = state['fontStyle'] === 'italic';
    const isUnderline = state['textDecoration'] === 'underline';
    const alignLeft = state['textAlign'] === 'left';
    const alignCenter = state['textAlign'] === 'center';
    const alignRight = state['textAlign'] === 'right';

    const buttons = [
        {
            icon: 'format_align_left',
            active: alignLeft,
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            active: alignCenter,
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: alignRight,
            value: {textAlign: 'right'}
        },
        {
            icon: 'format_bold',
            active: isBold,
            value: {fontWeight: isBold ? 'normal' : 'bold'}
        },
        {
            icon: 'format_italic',
            active: isItalic,
            value: {fontStyle: isItalic ? 'normal' : 'italic'}
        },
        {
            icon: 'format_underlined',
            active: isUnderline,
            value: {textDecoration: isUnderline ? 'none' : 'underline'}
        }
    ]
    return buttons.map(toButton).join('');
}