import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
function Chart({ type, data, width, height, numberSuffix, color, dotColor, theme, caption, xName, yName, dotSize, tooltip, ...otherProps }) {
    // Step 7 - Creating the JSON object to store the chart configurations
    const chartConfigs = {
        type,
        width,
        height,
        dataFormat: "json",
        // hasRTLText: true,
        dataSource: {
            chart: {
                "baseFont": "Cairo",
                caption,
                xAxisName: xName,
                yAxisName: yName,
                anchorradius: dotSize,
                plotToolText: tooltip,
                showHoverEffect: "1",
                showvalues: "0",
                numberSuffix,
                theme,
                anchorBgColor: dotColor || color,
                paletteColors: color
            },
            data
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(ReactFC, Object.assign({}, chartConfigs))));
}
Chart.defaultProps = {
    width: "99%",
    height: "400",
    type: "area2D",
    dotSize: 1,
    theme: "fusion",
    color: "#9bc4e4",
    tooltip: '',
};

export default Chart;
