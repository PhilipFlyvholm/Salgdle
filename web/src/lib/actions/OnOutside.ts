//Credit https://svelte.dev/repl/8031c800d7e34fd692dd18174b514e4e?version=3.49.0
export function onOutside(element:HTMLElement, callbackFunction: () => void){
    function onClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!element.contains(target)) {
            callbackFunction();
        }
    }
    setTimeout(() => {
    document.body.addEventListener('click', onClick);
    }, 1);
    return {
        update(newCallbackFunction: () => void) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener('click', onClick);
        }
    }
}