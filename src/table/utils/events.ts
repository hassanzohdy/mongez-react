import events from './../../events';

export const tableFilterEvents = {
    isExpanded: false,
    onToggle(callback) {
        return events.subscribe('table.filter.expand', callback);
    },
    toggle(isExpanded: boolean = null) {
        if (isExpanded === null) {
            isExpanded = !this.isExpanded;
        }

        this.isExpanded = isExpanded;

        return events.triggerAll('table.filter.expand', isExpanded)
    }
};