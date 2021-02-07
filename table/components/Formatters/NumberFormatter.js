function NumberFormatter({ column }) {
    return Number(column.value).toLocaleString();
}

export default NumberFormatter;
