import 'reinforcements';
import React from 'react';
import 'sprintf-js';
import '../../../localization/locales.js';
import '@flk/supportive-is';
import { Box, styled } from '@material-ui/core';
import Link from '../../../components/Link.js';
import '../../../components/Modal.js';
import 'material-ui-image';
import '../../../components/Chart.js';
import '../../../components/Avatar.js';
import '../../../components/Tabs.js';
import '@material-ui/core/colors';
import '../../../form/Context/FormContext.js';
import '../../../components/Confirm.js';
import 'react-timeago';
import '../../../components/Tooltip.js';
import '../../../components/ScrollTo.js';
import '../../../components/Redirect.js';
import '../../../components/Accordion.js';
import '../../../components/ColoredIcon.js';
import 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import '@material-ui/icons/AddCircle';
import '../../../components/Preloaders/Spinner/index.js';
import '../../../components/ColoredButton.js';
import '@material-ui/icons/Delete';
import '../../../components/LabelledOutline.js';
import '../../../components/Condition.js';
import '../../../components/Grid/GridItemCheckBoxContainer.js';
import '../../../components/Badge.js';
import { CardContainer, DataContainer, NumberCounter, CardText } from './CardStyle.js';

const Anchor = styled(Link)({
    textDecoration: 'none',
});
function Card(props) {
    const { number, text, to, icon: Icon, iconColor, backgroundColor, color, className } = props;
    let Wrapper = to ? Anchor : React.Fragment;
    const wrapperProps = {};
    if (to) {
        wrapperProps.to = to;
    }
    return (React.createElement(Wrapper, Object.assign({}, wrapperProps),
        React.createElement(CardContainer, { style: { backgroundColor, color }, className: className },
            React.createElement(Box, { display: "flex" },
                React.createElement(Box, { width: "100%" },
                    React.createElement(DataContainer, null,
                        React.createElement(NumberCounter, null, Number(number).toLocaleString()),
                        React.createElement(CardText, null, text))),
                React.createElement(Box, { flexShrink: 1 },
                    React.createElement(Icon, { style: { fill: iconColor, fontSize: '3rem' } }))))));
}

export default Card;
