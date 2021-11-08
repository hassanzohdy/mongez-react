class Events {
    private events = new Map<string, Array<Function>>();

    /**
    * Add new callback to the given event
    * This method is alias to addEventListener
    *
    */
    public on(event: string, callback: Function) {
        return this.addEventListener(event, callback);
    }

    /**
    * Add event listener
    *
    * @param string|array event
    */
    public addEventListener(event: string, callback: Function) {
        let events = event.split(' ');

        for (let event of events) {
            if (!this.events.has(event)) {
                this.events.set(event, [callback]);
            } else {
                const callbacks = this.events.get(event);
                if (callbacks) {
                    callbacks.push(callback);
                    this.events.set(event, callbacks);
                }
            }
        }

        return this;
    }

    /**
     * An alias to addEventListener
     */
    public subscribe(event: string, callback: Function) {
        return this.addEventListener(event, callback);
    }

    /**
    * Trigger the given event
    *
    */
    public trigger(event: string, ...args: any[]) {
        if (event.includes(' ')) {
            let events = event.split(' ');
            for (let event of events) {
                this.trigger(event, ...args);
            }
            return;
        }

        const callbacks = this.events.get(event);

        if (! callbacks) return;

        for (let callback of callbacks) {
            let callbackReturn = callback.apply(this, args);

            if (callbackReturn === false) {
                return false;
            } else if (typeof callbackReturn != 'undefined') {
                // if (callbackReturn.constructor.name == 'Promise') {
                //     return await callbackReturn;
                // } else {
                //     return callbackReturn;
                // }
                return callbackReturn;
            }
        }

        return this;
    }

    /**
     * An alias to trigger method 
     */
    public emit(event: string, ...args: any[]) {
        return this.trigger(event, ...args);
    }

    /**
    * This method is used to clear event(s) or remove all events callbacks
    *
    */
    off(events: string) {
        if (!events) {
            this.events.clear();
            return this;
        }

        const eventsList = events.split(' ');

        for (let event of eventsList) {
            if (this.events.has(event)) {
                this.events.delete(event);
            }
        }

        return this;
    }
}

const events = new Events();

export default events;