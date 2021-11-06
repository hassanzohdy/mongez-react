import React from 'react';
import Is from '@flk/supportive-is';
import TableForm from '../TableForm';
import { Obj } from 'reinforcements';
import useTable from '../../hooks/use-table';
import { trans } from './../../../localization';
import AddIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip, ColoredIcon } from './../../../components';
import { styled } from '@material-ui/core';
import { styleSettings } from '../../../layout';

const defaultButtonOptions = {
    tooltip: trans('add'),
    icon: {
        color: 'primary',
        fontSize: 'large',
    }
};

const SpanText = styled('span')({
    verticalAlign: '5px',
    margin: '0 0.3rem',
    fontSize: '1.1rem',
});

const Wrapper = styled('div')({
    borderRadius: '9px',
    padding: '0.2rem',
})

function AddButtonWrapper({ children }) {
    return (
        <Wrapper style={{
            backgroundColor: styleSettings.get('colors.primary'),
            color: styleSettings.get('colors.text.primary', '#FFF'),
        }}>{children}</Wrapper>
    )
}

export default function TableAddButton(props) {
    const [formIsOpened, openForm] = React.useState(false);

    const { service, options, updateRecords } = useTable();

    if (!options.haveAccessTo('add')) return null;

    const formOptions = props.formOptions || options.formOptions || {};

    if (!formOptions.modalOptions) {
        formOptions.modalOptions = props.modalOptions || {};
    }

    const { defaultData = { published: true } } = formOptions;

    const buttonOptions = Obj.merge(defaultButtonOptions, props.buttonOptions || {});

    const onSubmit = record => {
        updateRecords(tableRecords => {
            tableRecords.unshift(record);

            return [...tableRecords];
        });

        openForm(false);
    };

    if (Is.empty(formOptions)) return null;

    return (
        <>
            <Tooltip title={buttonOptions.tooltip}>
                <IconButton onClick={e => openForm(true)}>
                    <div>
                        <AddButtonWrapper>
                            <ColoredIcon icon={AddIcon} fontSize={'medium'} />
                            <SpanText>{trans((formOptions as any).singleName)}</SpanText>
                        </AddButtonWrapper>
                    </div>
                </IconButton>
            </Tooltip>

            <TableForm
                onSubmit={onSubmit}
                open={formIsOpened}
                onClose={e => openForm(false)}
                service={service}
                action="add"
                record={defaultData}
                formOptions={formOptions}
            />
        </>
    )
}