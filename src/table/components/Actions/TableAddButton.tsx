import React from 'react';
import Is from '@flk/supportive-is';
import TableForm from '../TableForm';
import { Obj } from 'reinforcements';
import useTable from '../../hooks/use-table';
import { trans } from './../../../localization';
import AddIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip, ColoredIcon } from './../../../components';

const defaultButtonOptions = {
    tooltip: trans('add'),
    icon: {
        color: 'primary',
        fontSize: 'large',
    }
};

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
            <IconButton onClick={e => openForm(true)}>
                <Tooltip title={buttonOptions.tooltip}>
                    <ColoredIcon icon={AddIcon} color={buttonOptions.icon.color} fontSize={buttonOptions.icon.fontSize} />
                </Tooltip>
            </IconButton>

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