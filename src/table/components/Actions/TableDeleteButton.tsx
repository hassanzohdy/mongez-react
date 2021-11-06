import React from 'react';
import useTable from '../../hooks/use-table';
import { trans } from './../../../localization';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteSweep';
import { Confirm, Tooltip } from './../../../components';

export default function TableDeleteButton({ record, rowIndex }) {
    const [confirming, setConfirm] = React.useState(false);

    const { service, options, updateRecords } = useTable();

    if (!options.haveAccessTo('delete', record)) return null;

    const removeRecord = e => {
        // update table records
        updateRecords(records => {
            records.splice(rowIndex, 1);

            return [...records];
        });

        // Remove from API
        service.delete(record.id);
    };

    return (
        <>
            <Tooltip title={trans('remove')}>
                <IconButton onClick={e => setConfirm(true)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

            <Confirm open={confirming}
                onClose={e => setConfirm(false)}
                onConfirm={removeRecord}
                message={trans('removeText')} />
        </>
    )
}