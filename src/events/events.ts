import { EventTriggerResponse, EventSubscription } from "./types";

class Events {
    private events = new Map<string, Array<EventSubscription>>();

    /**
    * Add new callback to the given event
    * This method is alias to addEventListener
    *
    */
    public on(event: string, callback: Function): EventSubscription | EventSubscription[] {
        return this.addEventListener(event, callback);
    }

    /**
    * Add event listener
    *
    * @param string|array event
    */
    public addEventListener(event: string, callback: Function): EventSubscription | EventSubscription[] {
        if (event.includes(' ')) {
            let subscriptions: EventSubscription[] = [];
            for (let eventName of event.split(' ')) {
                subscriptions.push(this.subscribe(eventName, callback));
            }
        } else {
            return this.subscribe(event, callback);
        }
    }

    /**
     * Subscribe to the given event
     */
    public subscribe(event: string, callback: Function): EventSubscription {
        const eventHandler = this.events.get(event) || [];
        let subscription: EventSubscription = {
            callback,
            event,
            dispatch(...args) {
                return callback(...args);
            },
            unsubscribe: () => {
                let index = eventHandler.indexOf(subscription);
                if (index !== -1) {
                    eventHandler.splice(index, 1);
                }
            }
        };

        eventHandler.push(subscription);

        this.events.set(event, eventHandler);

        return subscription;
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

        if (!callbacks) return;

        for (let callback of callbacks) {
            let callbackReturn = callback.dispatch(...args);

            if (callbackReturn === false) {
                return false;
            } else if (callbackReturn !== undefined) {
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
     * Trigger the event and do not stop on event callback returning false
     * 
     * @param {string} event
     * @param  {any[]} args 
     * @returns {any[]}
     */
    public triggerAll(event: string, ...args): EventTriggerResponse | EventTriggerResponse[] {
        if (event.includes(' ')) {
            let events = event.split(' ');
            let multipleEvents: EventTriggerResponse[] = [];

            for (let event of events) {
                multipleEvents.push(this.triggerAll(event, ...args) as EventTriggerResponse);
            }

            return multipleEvents;
        }

        const callbacks = this.events.get(event);

        let returnedOutput: EventTriggerResponse = {
            event,
            length: 0,
            results: [],
        };

        for (let callback of callbacks) {
            let callbackReturn = callback.dispatch(...args);

            returnedOutput.length++;

            if (callbackReturn !== undefined) {
                returnedOutput.results.push(callbackReturn);
            }
        }

        return returnedOutput;
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