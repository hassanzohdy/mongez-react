import PropTypes from 'prop-types';
declare function LazyTable(props: any): JSX.Element;
declare namespace LazyTable {
    var propTypes: {
        options: PropTypes.Validator<object>;
        request: PropTypes.Validator<(...args: any[]) => any>;
        mapResponse: PropTypes.Validator<(...args: any[]) => any>;
    };
}
export default LazyTable;
