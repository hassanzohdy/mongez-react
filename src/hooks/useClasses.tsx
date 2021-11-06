import React from 'react'
import clsx from 'clsx';
import Is from '@flk/supportive-is';
import { Obj } from 'reinforcements';

/**
 * Handle classes properly in components for ease of use
 */
export default function useClasses(props: any, baseClasses: object = {}) {
    const comingClasses = React.useMemo(() => {
        return {...(props.classes || {})};
    }, [props.classes]);

    return (className: string | string[], ...moreClasses: any[]): string => {
        let returnedClasses = [];
        if (Is.array(className)) {
            returnedClasses = (className as string[]).map(className => Obj.get(comingClasses, className, ''));
            returnedClasses = returnedClasses.concat((className as string[]).map(className => Obj.get(baseClasses, className, '')));
        } else {
            returnedClasses.push(Obj.get(comingClasses, className as string, ''));
            returnedClasses.push(Obj.get(baseClasses, className as string, ''));
        }

        return clsx(...moreClasses, ...returnedClasses);
    };
}