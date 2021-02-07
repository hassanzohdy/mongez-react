import 'reinforcements';
import '../../router/router-history.js';
import 'react';
import 'sprintf-js';
import '../../localization/locales.js';
import '../../router/routes-list.js';
import '@flk/supportive-is';
import 'object-query-string';
import 'react-dom';
import 'react-router-dom';
import '@material-ui/core';
import '../../router/renderer.js';
import '../../router/update-current-localization.js';
import '../../components/Link.js';
import '../../components/Modal.js';
import 'material-ui-image';
import '../../components/Chart.js';
import '../../components/Avatar.js';
import '../../components/Tabs.js';
import '../../form/Context/FormContext.js';
import '../../components/Confirm.js';
import 'react-timeago';
import '../../components/Tooltip.js';
import '../../components/ScrollTo.js';
import '../../components/Redirect.js';
import '../../components/Accordion.js';
import '../../components/ColoredIcon.js';
import 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import '@material-ui/icons/AddCircle';
import '../../components/Preloaders/Spinner/index.js';
import '../../components/ColoredButton.js';
import '@material-ui/icons/Delete';
import '../../components/LabelledOutline.js';
import '../../components/Condition.js';
import '../../components/Grid/GridItemCheckBoxContainer.js';
import '../../components/Badge.js';
import '../../table/Context/TableContext.js';
import TableViewButton from '../../table/components/Actions/TableViewButton.js';
import TableEditButton from '../../table/components/Actions/TableEditButton.js';
import TableDeleteButton from '../../table/components/Actions/TableDeleteButton.js';
import ButtonsFormatter from '../../table/components/Formatters/ButtonsFormatter.js';

const tableActions = {
    heading: 'actions',
    formatter: ButtonsFormatter,
    buttons: [TableViewButton, TableEditButton, TableDeleteButton]
};

export default tableActions;
