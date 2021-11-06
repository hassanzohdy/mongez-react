export default class DataForm extends FormData {
    /**
     * Append data as array
     */
    public appendArray(name: string, data: any[]) {
        for (let value of data) {
            this.append(name, value);
        }
    }
}