import PropTypes from 'prop-types';
import MaterialTab from '@material-ui/core/Tab';
export { MaterialTab as TabHead, TabPanel as TabBody };
interface ITabPanel {
    children: any;
    value?: any;
    lazy?: boolean;
    index?: any;
}
declare function TabPanel(props: ITabPanel): JSX.Element;
declare namespace TabPanel {
    var propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        index: PropTypes.Validator<any>;
        value: PropTypes.Validator<any>;
    };
}
interface TabProps {
    label: string;
    children: any;
    index?: any;
    value?: any;
    icon?: any;
    lazy?: boolean;
}
export declare function Tab(props: TabProps): JSX.Element;
export declare namespace Tab {
    var propTypes: {
        label: PropTypes.Validator<string>;
        children: PropTypes.Validator<any>;
        index: PropTypes.Requireable<any>;
        value: PropTypes.Requireable<any>;
    };
}
declare function Tabs(props: any): JSX.Element;
declare namespace Tabs {
    var propTypes: {
        children: PropTypes.Validator<any>;
        value: PropTypes.Requireable<any>;
        barBackground: PropTypes.Requireable<string>;
        barTextColor: PropTypes.Requireable<string>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        lazy: PropTypes.Requireable<boolean>;
    };
}
export default Tabs;
