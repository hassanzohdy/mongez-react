import React from 'react';
import TableForm from '../TableForm';
import useTable from '../../hooks/use-table';
import { trans } from '../../../localization';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip } from './../../../components';
import useTableRow from '../../hooks/use-table-row';
import IconButton from '@material-ui/core/IconButton';

export default function TableEditButton(props) {
    const [formIsOpened, openForm] = React.useState(false);
    const { service, options } = useTable();

    const { record, updateRecord } = useTableRow();

    if (!options.haveAccessTo('edit', record)) return null;

    const formOptions = props.formOptions || options.formOptions || {};

    if (!formOptions.modalOptions) {
        formOptions.modalOptions = props.modalOptions || {};
    }

    const onSubmit = record => {
        updateRecord(record);

        openForm(false);
    };

    return (
        <>
            <IconButton onClick={e => openForm(true)}>
                <Tooltip title={trans('edit')}>
                    <EditIcon />
                </Tooltip>
            </IconButton>

            <TableForm
                onSubmit={onSubmit}
                open={formIsOpened}
                onClose={e => openForm(false)}
                service={service}
                action="edit"
                record={record}
                formOptions={formOptions}
            />
        </>
    )
}
