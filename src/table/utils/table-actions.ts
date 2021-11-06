import { TableColumn } from './wizardTable';
import TableViewButton from '../components/Actions/TableViewButton';
import TableEditButton from '../components/Actions/TableEditButton';
import TableDeleteButton from '../components/Actions/TableDeleteButton';
import ButtonsFormatter from '../components/Formatters/ButtonsFormatter';
import navigateableButton from '../components/Actions/navigateableButton';

const tableActions: TableColumn = {
    heading: 'actions',
    key: 'tableActions',
    formatter: ButtonsFormatter,
    buttons: [TableViewButton, TableEditButton, TableDeleteButton]
};

export { navigateableButton };

export default tableActions;