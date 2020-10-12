import {$} from "@core/dom";

export function resizeTable(event, root) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === "col" ? "bottom" : "right";
    let value;
    $resizer.css({
        opacity: 1,
        [sideProp]: "-2000px"
    });
    document.onmousemove = (e)=>{
        e.preventDefault();
        if (type === "col") {
            const delta = e.pageX - coords.right;
            value = coords.width + delta;
            $resizer.css({
                right: -delta + "px"
            });
        } else {
            const delta = e.clientY - coords.bottom;
            value = coords.height + delta;
            $resizer.css({
                bottom: -delta + "px"
            });
        }
    }
    document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (type === "col") {
            root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach((e) => {
                e.style.width = value + 'px';
            });
            $parent.css({
                width: value + 'px'
            });
        } else {
            $parent.css({
                height: value + "px"
            });
        }
        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        });
    };
}