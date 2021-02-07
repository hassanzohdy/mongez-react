declare class Events {
    private events;
    /**
    * Add new callback to the given event
    * This method is alias to addEventListener
    *
    */
    on(event: string, callback: Function): this;
    /**
    * Add event listener
    *
    * @param string|array event
    */
    addEventListener(event: string, callback: Function): this;
    /**
     * An alias to addEventListener
     */
    subscribe(event: string, callback: Function): this;
    /**
    * Trigger the given event
    *
    */
    trigger(event: string, ...args: any[]): any;
    /**
     * An alias to trigger method
     */
    emit(event: string, ...args: any[]): any;
    /**
    * This method is used to clear event(s) or remove all events callbacks
    *
    */
    off(events: string): this;
}
declare const events: Events;
export default events;
