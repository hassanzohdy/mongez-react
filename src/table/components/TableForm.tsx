import React from 'react';
import useTable from '../hooks/use-table';
import { trans } from './../../localization';
import { ProgressBar } from './../../components';
import { FormError, FormModal } from './../../form';

export interface FormProps {
    record?: {
        [type: string]: any,
    };
    index?: number;
}

export default function TableForm(props: any): any {
    let { action, formOptions, onClose, recordIndex, open, onSubmit, service, record = {} } = props;
    const [lazyRecord, setLazyRecord] = React.useState(({} as any));
    const [error, setError] = React.useState(null);

    const itemType = action === 'edit' ? 'editItem' : 'addItem';

    const { records, updateRecords } = useTable();

    React.useEffect(() => {
        if (open && formOptions.lazyForm && record.id && !lazyRecord.id) {
            let request = formOptions.request || service.get.bind(service);

            request(record.id).then(({ data }) => {
                setLazyRecord(data.record);
            });
        }
    }, [formOptions, lazyRecord, record, service, open]);

    if (!open) return null;

    const submitForm = async (e, form) => {
        setError(null);
        try {
            const form = e.target;
            let savedRecord;
            if (action === 'edit') {
                let { data } = await service.update(record.id, form);
                let { record: responseRecord } = data;

                savedRecord = responseRecord;
            } else {
                // action here is adding
                let { data } = await service.create(form);

                let { record: responseRecord } = data;

                savedRecord = responseRecord;
            }

            onSubmit && onSubmit(savedRecord, action);

            formOptions.onSave && formOptions.onSave(savedRecord, record, recordIndex, updateRecords, records);
        } catch (responseError) {
            form.submitting(false);
            if (responseError.response && responseError.response.data) {
                const { errors, error } = responseError.response.data;
                setError(error || errors);
            }
        }
    };

    let content;

    if (formOptions.lazyForm) {
        if (!lazyRecord.id && record.id) {
            content = <div style={{ marginTop: '5rem', marginBottom: '5rem' }}>
                <ProgressBar />
            </div>
        } else {
            content = <formOptions.lazyForm index={recordIndex} record={lazyRecord} />;
        }
    } else {
        content = <formOptions.form index={recordIndex} record={record} />;
    }

    const onModalClose = () => {
        setLazyRecord({}); // reset object
        onClose();
    }

    return (
        <FormModal
            open={open}
            onSubmit={submitForm}
            title={trans(itemType, trans(formOptions.singleName))}
            onClose={onModalClose}
            {...(formOptions.modalOptions || {})}
        >
            <FormError error={error} />
            {content}
        </FormModal>
    );
}