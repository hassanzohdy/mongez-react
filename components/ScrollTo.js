import { ltrim } from 'reinforcements';
import React from 'react';
import scrollTo from '../utils/scrollTo.js';
import PropTypes from 'prop-types';

/**
 * ScrollTo Component
 * This component is a part of reactor framework for React Js
 * Release Date: 29/07/2020
 * Author Name: Hasan Zohdy
 * Author Email: hassanzohdy@gmail.com
 *
 * This component allow you to scroll down/up to certain element in the page
 * for the given content id
 * The content id MUST not start with a #, only the id value should be provided
 * Also the button content MUST be provided otherwise the button will not work
 *
 * Example Of Usage
 *
 * <ScrollTo id="latest-news">
 *     Scroll To Latest News Section
 * </ScrollTo>
 */
function ScrollTo(props) {
    const { id, component: Component = 'div', onClick, ...otherProps } = props;
    const scroll = e => {
        scrollTo('#' + ltrim(id, '#'));
        onClick && onClick();
    };
    return (React.createElement(Component, Object.assign({ onClick: scroll }, otherProps)));
}
ScrollTo.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    component: PropTypes.node,
};
ScrollTo.defaultProps = {
    component: 'button',
};

export default ScrollTo;
