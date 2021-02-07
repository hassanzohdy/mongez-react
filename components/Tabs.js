import React from 'react';
import Is from '@flk/supportive-is';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import MaterialTab from '@material-ui/core/Tab';
export { default as TabHead } from '@material-ui/core/Tab';
import MaterialTabs from '@material-ui/core/Tabs';
import { makeStyles, styled } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, lazy, index, ...other } = props;
    let tabContent;
    if (lazy) {
        tabContent = value === index && (React.createElement(Typography, { component: "div" }, children));
    }
    else {
        tabContent = React.createElement(Box, { p: 3, children: children });
    }
    return (React.createElement("div", Object.assign({ role: "tabpanel", hidden: value !== index, id: `simple-tabpanel-${index}`, "aria-labelledby": `simple-tab-${index}` }, other), tabContent));
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
const useStyles = makeStyles((theme) => {
    return {
        root: {
            // flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
        appBar: (props) => {
            return props.appBar;
        }
    };
});
function Tab(props) {
    return React.createElement(React.Fragment, Object.assign({}, props));
}
Tab.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    index: PropTypes.any,
    value: PropTypes.any
};
const IconWrapper = styled('span')({
    // verticalAlign: 'middle',
    marginRight: '0.5rem',
});
const MaterialLabelWrapper = styled('span')({
    verticalAlign: 'top',
});
function MaterialIcon(props) {
    if (!props.icon)
        return null;
    return (React.createElement(IconWrapper, null, React.createElement(props.icon, null)));
}
function MaterialTabLabel(props) {
    return (React.createElement("span", null,
        React.createElement(MaterialIcon, Object.assign({}, props)),
        React.createElement(MaterialLabelWrapper, null, props.label)));
}
function Tabs(props) {
    let { value: defaultValue = 0, barBackground = 'secondary', barTextColor, onChange, lazy, children } = props;
    const styleSettings = {
        appBar: {},
    };
    if (!['primary', 'secondary'].includes(barBackground)) {
        styleSettings.appBar.background = barBackground;
        barBackground = undefined; // disable the coloring
    }
    if (barTextColor) {
        styleSettings.appBar.color = barTextColor;
    }
    const classes = useStyles(styleSettings);
    const [value, setValue] = React.useState(defaultValue);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        onChange && onChange(newValue);
    };
    if (!Is.array(children)) {
        children = [children];
    }
    return (React.createElement("div", { className: classes.root },
        React.createElement(AppBar, { classes: { root: classes.appBar }, color: barBackground, position: "static" },
            React.createElement(MaterialTabs, { value: value, onChange: handleChange }, children.map((tab, index) => (React.createElement(MaterialTab, { value: tab.props.index || tab.props.value || index, key: index, label: React.createElement(MaterialTabLabel, Object.assign({}, tab.props)) }))))),
        children.map((tab, index) => (React.createElement(TabPanel, { key: index, lazy: tab.props.lazy !== undefined ? tab.props.lazy : lazy, value: value, index: tab.props.index || tab.props.value || index, children: tab.props.children })))));
}
Tabs.propTypes = {
    children: PropTypes.any.isRequired,
    value: PropTypes.any,
    barBackground: PropTypes.string,
    barTextColor: PropTypes.string,
    onChange: PropTypes.func,
    lazy: PropTypes.bool,
};

export default Tabs;
export { Tab, TabPanel as TabBody };
