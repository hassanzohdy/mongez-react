import PropTypes from 'prop-types';
interface ISidebarListItem {
    text: string;
    route: string;
    nested?: boolean;
    onClick: Function;
    icon: any;
}
declare function SidebarListItem(props: ISidebarListItem): JSX.Element;
declare namespace SidebarListItem {
    var propTypes: {
        text: PropTypes.Validator<string>;
        route: PropTypes.Validator<string>;
        nested: PropTypes.Requireable<boolean>;
    };
}
export default SidebarListItem;
