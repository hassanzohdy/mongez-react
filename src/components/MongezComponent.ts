import { Component } from "react";
import { Obj } from 'reinforcements';
import Is from "@flk/supportive-is";

class MongezComponent extends Component<any,any> {
    constructor(props) {
        super(props);

        setTimeout(() => {
            this.init();
        }, 0);
    }

    /**
     * Triggered just before rendering the component into the DOM for the first time
     * This method should be used instead of constructor for doing certain actions/requests
     * 
     * @memberof MongezComponent
     */
    init() { }

    /**
     * Triggered after the component is rendered
     * 
     * @alias componentDidMount
     * @memberof MongezComponent
     */
    ready() { }

    /**
     * {@inheritdoc}
     */
    componentDidMount() {
        this.ready();
    }

    /**
     * Triggered before the component is rendered again
     * 
     * @alias getSnapshotBeforeUpdate
     * @memberof MongezComponent
     */
    beforeUpdating(props, state) { }

    /**
     * {@inheritdoc}
     */
    getSnapshotBeforeUpdate(props, state) {
        let data: any = this.beforeUpdating(props, state);

        // if this method returns the following object
        return data || null;
    }

    /**
     * Triggered after the component is rendered again
     * 
     * @param {object} props
     * @param {object} state
     * @param {any} snapshot
     * @alias componentDidUpdate
     * @memberof MongezComponent
     */
    onUpdate(props, state, snapshot) { }

    /**
     * {@inheritdoc}
     */
    componentDidUpdate(props, state, snapshot) {
        this.onUpdate(props, state, snapshot); // good practice
    }

    /**
     * Triggered before the component is destroyed
     * 
     * @alias componentWillUnmount
     * @memberof MongezComponent
     */
    destroy() { }

    /**
     * {@inheritdoc}
     */
    componentWillUnmount() {
        this.destroy();
    }

    /**
     * Set the given value to its corresponding key
     * The key here is a dot notation basis 
     *
     * @param {string} key
     * @param {*} value
     * @memberof MongezComponent
     */
    set(key, value) {
        this.setState(
            Obj.set(this.state, key, value),
        );
    }

    /**
     * Get component children
     * 
     * @param   {any} args 
     * @returns {array|null}
     */
    children() {
        let children: any = this.props.children;

        return Is.callable(children) ? children(this) : children;
    }

    /**
     * Get the value of the given `dot.notation` key from state
     * 
     * @param   {string} key
     * @param   {*} $default
     * @returns {*}  
     */
    get(key, $default = null) {
        return Obj.get(this.state, key, $default);
    }
}

export default MongezComponent;