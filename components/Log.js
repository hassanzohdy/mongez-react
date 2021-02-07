function Log({ value = null, trace = false }) {
    if (value) {
        console.log(value);
    }
    if (trace) {
        console.trace();
    }
    return null;
}

export default Log;
