import config from '../../config/index.js';
import React from 'react';
import '../../localization/locales.js';
import { translateFrom } from '../../localization/translator.js';
import { styled } from '@material-ui/core';
import For from '../../components/For.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';

const FlagWrapper = styled('div')({
    marginTop: '0.4rem'
});
const LanguageFlag = styled('img')({
    width: '16px',
    height: '16px',
    marginRight: '0.3rem',
    verticalAlign: 'middle',
});
function MultiLingualInput(props) {
    let { component: Component, name, label, value, inline = true, placeholder, autoFocus, ...otherProps } = props;
    let firstLocaleCode;
    return (React.createElement(GridContainer, null,
        React.createElement(For, { object: config.get('locales'), render: (localeCode, localeInfo) => {
                let languageContent = localeInfo.name;
                let inputPlaceholder = placeholder;
                let inputAutoFocus = false;
                let inputValue = value;
                if (localeInfo.flag) {
                    languageContent = (React.createElement(React.Fragment, null,
                        React.createElement(LanguageFlag, { src: localeInfo.flag, alt: localeInfo.name, title: localeInfo.name }),
                        localeInfo.name));
                }
                if (inputValue && inputValue[localeCode]) {
                    inputValue = inputValue[localeCode];
                }
                let itemProps = {};
                if (inline) {
                    itemProps['sm'] = 6;
                }
                if (!firstLocaleCode && autoFocus) {
                    inputAutoFocus = true;
                }
                firstLocaleCode = localeCode;
                return (React.createElement(GridItem, Object.assign({}, itemProps),
                    React.createElement(FlagWrapper, null, languageContent),
                    React.createElement(Component, Object.assign({}, otherProps, { value: inputValue, autoFocus: inputAutoFocus, label: translateFrom(localeCode, label), placeholder: translateFrom(localeCode, inputPlaceholder), name: name + '.' + localeCode }))));
            } })));
}

export default MultiLingualInput;
