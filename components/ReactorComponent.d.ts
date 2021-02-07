import { Component } from "react";
declare class ReactorComponent extends Component<any, any> {
    constructor(props: any);
    /**
     * Triggered just before rendering the component into the DOM for the first time
     * This method should be used instead of constructor for doing certain actions/requests
     *
     * @memberof ReactorComponent
     */
    init(): void;
    /**
     * Triggered after the component is rendered
     *
     * @alias componentDidMount
     * @memberof ReactorComponent
     */
    ready(): void;
    /**
     * {@inheritdoc}
     */
    componentDidMount(): void;
    /**
     * Triggered before the component is rendered again
     *
     * @alias getSnapshotBeforeUpdate
     * @memberof ReactorComponent
     */
    beforeUpdating(props: any, state: any): void;
    /**
     * {@inheritdoc}
     */
    getSnapshotBeforeUpdate(props: any, state: any): any;
    /**
     * Triggered after the component is rendered again
     *
     * @param {object} props
     * @param {object} state
     * @param {any} snapshot
     * @alias componentDidUpdate
     * @memberof ReactorComponent
     */
    onUpdate(props: any, state: any, snapshot: any): void;
    /**
     * {@inheritdoc}
     */
    componentDidUpdate(props: any, state: any, snapshot: any): void;
    /**
     * Triggered before the component is destroyed
     *
     * @alias componentWillUnmount
     * @memberof ReactorComponent
     */
    destroy(): void;
    /**
     * {@inheritdoc}
     */
    componentWillUnmount(): void;
    /**
     * Set the given value to its corresponding key
     * The key here is a dot notation basis
     *
     * @param {string} key
     * @param {*} value
     * @memberof ReactorComponent
     */
    set(key: any, value: any): void;
    /**
     * Get component children
     *
     * @param   {any} args
     * @returns {array|null}
     */
    children(): any;
    /**
     * Get the value of the given `dot.notation` key from state
     *
     * @param   {string} key
     * @param   {*} $default
     * @returns {*}
     */
    get(key: any, $default?: any): any;
}
export default ReactorComponent;
