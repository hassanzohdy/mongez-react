import PropTypes from 'prop-types';
interface ISidebarListItemGroup {
    text: string;
    items: any[];
    onClick: Function;
    icon: any;
}
declare function SidebarListItemGroup(props: ISidebarListItemGroup): JSX.Element;
declare namespace SidebarListItemGroup {
    var propTypes: {
        text: PropTypes.Validator<string>;
        nestedItemClass: PropTypes.Requireable<string>;
        items: PropTypes.Validator<any[]>;
    };
}
export default SidebarListItemGroup;
