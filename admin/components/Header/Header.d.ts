import PropTypes from 'prop-types';
declare function Header(props: any): JSX.Element;
declare namespace Header {
    var propTypes: {
        onClick: PropTypes.Validator<(...args: any[]) => any>;
        classes: PropTypes.Requireable<object>;
        sidebarIsOpened: PropTypes.Requireable<boolean>;
    };
}
export default Header;
