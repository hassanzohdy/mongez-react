export const ENTER_KEY = 13;
export const ESC_KEY = 27;
export const TAB_KEY = 9;
export const CONTROL_KEY = 17;

export default function pressed(e, key) {
    return (e.keyCode || e.charCode) === key;
}