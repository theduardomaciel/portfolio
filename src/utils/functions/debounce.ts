export default function debounce(func: () => void) {
    let timer: any;
    return function (event: any) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 100, event);
    };
}