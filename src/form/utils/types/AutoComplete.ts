import { AxiosResponse } from "axios";
import { InputRule } from "./Validation";

/**
 * The option type object that will be used
 */
export type AutoCompleteOption = {
    /**
     * option text that will be displayed.
     */
    text?: React.ReactNode;
    /**
     * option value.
     */
    value?: string | number | boolean;
    /**
     * If set to true, the option will not be available for selection.
     */
    disabled?: boolean;
    /**
     * The image prop key
     */
    image?: string;
    /**
     * option label
     */
    label?: string | object | Array<object>;
    /**
     * The rendering image component
     */
    imageComponent?: React.FC | React.ComponentClass;
}

export type OptionValue = string | number | boolean | Array<string | number | boolean>;

/**
 * Type of option that may be passed as an item
 */
export type GuessableAutoCompleteOption = string | number | boolean | AutoCompleteOption & {
    /**
     * option id
     */
    id?: number;
    /**
     * option title
     */
    title?: string | object | Array<object>;
    /**
     * option name
     */
    name?: string | object | Array<object>;
};

export type AutoCompleteProps = {
    /**
     * Input name
     */
    name?: string;
    /**
     * Input label
     */
    label?: React.ReactNode;
    /**
     * Label component
     */
    LabelComponent?: React.ComponentType;
    /**
     * Components list
     */
    components?: {
        option?: React.ComponentType<{option: any, index: number}>;
        label?: React.ComponentType<any>;
    }
    /**
     * Label Position
     */
    labelPosition?: 'top' | 'inline';
    /**
     * Classes List
     */
    classes?: {
        /**
         * Auto complete wrapper class
         */
        root?: string;
        /**
         * Auto complete label class
         */
        label?: string;
    }
    /**
     * Input id
     */
    id?: string;
    /**
     * Auto focus on component
     */
    autoFocus?: boolean;
    /**
     * Input placeholder
     */
    placeholder?: string;
    /**
     * Input value, if provided, onChange must be provided as well, otherwise use defaultValue prop
     * The input value will be controlled by call 
     * 
     * @note This prop is watchable for changes
     */
    value?: any;
    /**
     * Input default value, will make the component uncontrolled
     */
    defaultValue?: any;
    /**
     * Determine whether display an image or not.
     * If set to true, default key name for the image prop is `image`.
     * Otherwise pass the image prop key for the prop.
     * 
     * @default false
     */
    imageable?: boolean | string;
    /**
     * Default image if image is not provided in the option object
     * Works only when `imageable` prop is activated
     */
    defaultImage?: string;
    /**
     * When component value is changed, this method is triggered.
     */
    onChange?: (newValue: AutoCompleteOption | AutoCompleteOption[], oldValue: AutoCompleteOption | AutoCompleteOption[]) => void;
    /**
     * Triggered on component search
     */
    onSearch?: (newSearchText: string, oldSearchText: string) => void;
    /**
     * List of items that will be rendered
     * @note This prop is watchable for changes
     * @deprecated use options prop instead
     */
    items?: GuessableAutoCompleteOption[];
    /**
     * List of items that will be rendered
     * @note This prop is watchable for changes
     */
    options?: GuessableAutoCompleteOption[];
    /**
     * Triggered when an error occurs
     */
    onError?: (errorMessage: string, errorType: string) => void;
    /**
     * Map the option for the items list to be rendered
     * 
     * @deprecated use mapOption instead
     */
    mapItem?: (item: any) => AutoCompleteOption;
    /**
     * Map the option for the items list to be rendered
     */
    mapOption?: (item: any) => AutoCompleteOption;
    /**
     * Set the maximum items that can be only selected
     * @note This prop is watchable for changes
     */
    limit?: number;
    /**
     * If set to true, then the component will disable any selection/unselection
     * 
     * @default false
     * @note This prop is watchable for changes
     */
    disabled?: boolean;
    /**
     * Set the excepted values that must not be rendered
     */
    except?: any[];
    /**
     * If set to true, display the loading indicator
     * 
     * @note This prop is watchable for changes
     */
    loading?: boolean;
    /**
     * The request callback for lazy loading
     */
    request?: (value: any, type: string) => Promise<any>;
    /**
     * If set to true, the none selection will be palaced on top of the items
     * 
     * @default value of multiple prop
     */
    none?: boolean;
    /**
     * If set to true, the items can be searched on
     * 
     * @default false
     */
    searchable?: boolean;
    /**
     * Determine whether the data will be loaded using lazy load
     * 
     * @default false
     */
    lazyLoading?: boolean;
    /**
     * Group items by
     * 
     * If value is string, then it will be grouped by that name in the list
     * You may customize the `group by` prop by calling it using a callback function.
     */
    groupBy?: ((item: any) => string) | string;
    /**
     * If set to true, then the user can add new value
     * 
     * @default false
     */
    addable?: boolean;
    /**
     * Triggered when `addable` prop is set to true and user added new selection value
     */
    onAdd?: (newValue: string) => void;
    /**
     * Close drop down on selection
     * 
     * @default reverse value of `multiple` prop
     */
    closeOnSelect?: boolean;
    /**
     * The loading text that will be displayed while fetching data remotely.
     * 
     * @default: trans('loading')
     */
    loadingMessage?: React.ReactNode;
    /**
     * The `no options` text that will be displayed when there are no results
     * 
     * @default: trans('noOptions')
     */
    noResultsMessage?: React.ReactNode;
    /**
     * Determine whether the input is multiple selection
     * 
     * @default false
     */
    multiple?: boolean;
    /**
     * Determine whether the component value is required
     * 
     * Works only when the component is part of Form component
     * 
     * @default false
     */
    required?: boolean;
    /**
     * Determine whether the component value is clearable
     * 
     * @defaults reverse value of required prop
     */
    clearable?: boolean;
    /**
     * Map the response from the ajax request and return list of items
     */
    mapResponse?: (response: AxiosResponse) => AutoCompleteOption[];
    /**
     * Component theme
     * 
     * @default semantic
     */
    theme?: 'semantic' | 'material' | 'select';
    /**
     * Component Validation Rules List
     *  
     */
    rules?: InputRule[];
    /**
     * Extra props
     */
    [key: string]: any;
};

export type AutoCompleteHook = {
    /**
     * Component id
     */
    id: string;
    /**
     * Adjust clearable value
     */
    clearable: boolean;
    /**
     * Close on select
     */
    closeOnSelect: boolean;
    /**
     * Required value
     */
    required: boolean;
    /**
     * Disabled
     */
    disabled: boolean;
    /**
     * Loading state
     */
    loading: boolean;
    /**
     * Multiple state
     */
    multiple: boolean;
    /**
     * No Result message
     */
    noResultsMessage: React.ReactNode;
    /**
     * Loading Message message
     */
    loadingMessage: React.ReactNode;
    /**
     * Options list
     */
    options: AutoCompleteOption[];
    /**
     * Current Value 
     */
    value: OptionValue;
    /**
     * Update value
     */
    setValue: (newValue: any) => void;
    /**
     * Component Label
     */
    label: React.ReactNode;
    /**
     * Label Position
     */
    labelPosition?: 'top' | 'inline';
    /**
     * Component placeholder
     */
    placeholder: React.ReactNode;
    /**
     * Component error
     */
    error: string | null;
    /**
     * Detect search change
     */
    detectSearch: (e: React.SyntheticEvent<HTMLElement>) => void;
    /**
     * On Auto complete selection
     */
    onSelection: (newValue: any) => void;
    /**
     * Searchable state
     */
    searchable: boolean;
    /**
     * Input Name
     */
    name: string;
    /**
     * Limited options
     */
    limit: number | null;
    /**
     * Rest of other props
     */
    otherProps?: object;
    /**
     * Classes List
     */
    classes?: {
        /**
         * Auto complete wrapper class
         */
        root?: string;
        /**
         * Auto complete label class
         */
        label?: string;
    }
}