import React from 'react';
import { useRequest } from 'mongez/hooks';
import service from '../../services/service';
import { TextCenter, CircleProgress } from 'mongez/components';

export default function ComponentDetailsPage({ params }) {
    const { id } = params;
    const [isLoading, loading] = React.useState(true);
    const [response, error] = useRequest(() => service.get(id), loading);

    if (isLoading) {
        return <CircleProgress />
    }

    if (error) {
        return <TextCenter variant="h1">Error: {error.response.error || error.response.data.error}</TextCenter>
    }

    const record = response.data.record;

    return (
        <>
            <h1>Successfully Record Loaded!</h1>
        </>
    );
}