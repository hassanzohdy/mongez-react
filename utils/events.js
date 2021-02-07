const ENTER_KEY = 13;
const ESC_KEY = 27;
function pressed(e, key) {
    return (e.keyCode || e.charCode) === key;
}

export default pressed;
export { ENTER_KEY, ESC_KEY };
