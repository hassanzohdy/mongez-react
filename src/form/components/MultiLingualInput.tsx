import React from 'react';
import config from '../../config';
import For from '../../components/For';
import HiddenInput from './HiddenInput';
import { styled } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem';
import { LangModeType } from '../../utils/CommonTypes';
import { getLangMode } from '../../localization/utils';
import GridContainer from '../../components/Grid/GridContainer';
import { getLocaleCodes, translateFrom } from '../../localization';

export type MultiLingualInputProps = {
    name: string;
    inline?: boolean;
    [id: string]: any;
    langMode?: LangModeType;
    component: React.FC<any> | React.ComponentClass<any>;
};

const FlagWrapper = styled('div')({
    marginTop: '0.4rem'
});

const LanguageFlag = styled('img')({
    width: '16px',
    height: '16px',
    marginRight: '0.3rem',
    verticalAlign: 'middle',
});

export default function MultiLingualInput(props: MultiLingualInputProps): React.ReactElement {
    let { component: Component, langMode = getLangMode(), name, label, value, inline, placeholder, autoFocus, ...otherProps } = props;

    let firstLocaleCode;

    const localeCodes = getLocaleCodes();

    return (
        <GridContainer>
            <For array={localeCodes} render={(localeCode, index) => {
                const localeInfo = config.get('locales.' + localeCode);

                let inputValue = value;
                let inputAutoFocus = false;
                let inputPlaceholder = placeholder;
                let languageContent = localeInfo.name;

                if (localeInfo.flag) {
                    languageContent = (
                        <>
                            <LanguageFlag src={localeInfo.flag} alt={localeInfo.name} title={localeInfo.name} />
                            { localeInfo.name}
                        </>
                    )
                }

                let inputName;

                if (langMode === 'object') {
                    inputName = name + '.' + localeCode;

                    if (inputValue && inputValue[localeCode]) {
                        inputValue = inputValue[localeCode];
                    }
                } else if (langMode === 'array') {
                    inputName = `${name}.${index}.text`;

                    if (inputValue) {
                        inputValue = (inputValue.find(value => value.localeCode === localeCode) || {}).text;
                    }
                }

                let itemProps = {};

                if (inline) {
                    itemProps['sm'] = 12 / localeCodes.length;
                }

                if (!firstLocaleCode && autoFocus) {
                    inputAutoFocus = true;
                }

                firstLocaleCode = localeCode;

                return (
                    <GridItem {...itemProps}>
                        <FlagWrapper>{languageContent}</FlagWrapper>
                        {langMode === 'array' && <HiddenInput name={`${name}.${index}.localeCode`} value={localeCode} />}
                        <Component {...otherProps} value={inputValue} autoFocus={inputAutoFocus} label={translateFrom(localeCode, label)} placeholder={translateFrom(localeCode, inputPlaceholder)} name={inputName} />
                    </GridItem>
                )

            }} />
        </GridContainer>
    );
}

MultiLingualInput.defaultProps = {
    inline: true,
} as MultiLingualInputProps;