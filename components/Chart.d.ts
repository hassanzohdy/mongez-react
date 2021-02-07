declare function Chart({ type, data, width, height, numberSuffix, color, dotColor, theme, caption, xName, yName, dotSize, tooltip, ...otherProps }: {
    [x: string]: any;
    type: any;
    data: any;
    width: any;
    height: any;
    numberSuffix: any;
    color: any;
    dotColor: any;
    theme: any;
    caption: any;
    xName: any;
    yName: any;
    dotSize: any;
    tooltip: any;
}): JSX.Element;
declare namespace Chart {
    var defaultProps: {
        width: string;
        height: string;
        type: string;
        dotSize: number;
        theme: string;
        color: string;
        tooltip: string;
    };
}
export default Chart;
