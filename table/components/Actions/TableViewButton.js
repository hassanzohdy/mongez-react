import navigateableButton from './navigateableButton.js';
import VisibilityIcon from '@material-ui/icons/Visibility';

const TableViewButton = navigateableButton({
    icon: VisibilityIcon,
    tooltip: 'view',
    permission: 'view',
});

export default TableViewButton;
