/**
 * A very simply Observable class
 */

export class Observable<T> {
    /** Internal implementation detail */
    private _subscribe: any;

    /**
      * @constructor
      * @param {Function} subscribe is the function that is called when the 
      * observable is subscribed to. This function is given a subscriber/observer
      * which provides the three methods on the Observer interface:
      * onNext, onError, and onCompleted
    */
    constructor(subscribe?: any) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }

    // public api for registering an observer
    subscribe(onNext: any, onError?: any, onComplete?: any) {
        if (typeof onNext === 'function') {
            return this._subscribe({
                onNext: onNext,
                onError: onError || (() => {}),
                onComplete: onComplete || (() => {})
            });
        } else {
            return this._subscribe(onNext);
        }
    }
 }