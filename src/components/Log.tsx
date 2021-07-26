export type ConsoleLogProps = {
    value?: any;
    trace?: boolean;
};

export default function Log({ value = null, trace = false }: ConsoleLogProps) {
    if (value) {
        console.log(value);
    }

    if (trace) {
        console.trace();
    }

    return null;
}