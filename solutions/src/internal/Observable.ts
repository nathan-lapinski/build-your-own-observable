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
        // very simple. We create an "observer" out of the three
        // methods, and pass it into our internal _subscribe function.
        const anon = () => {};
        return this._subscribe({
            onNext: onNext,
            onError: onError || anon,
            onComplete: onComplete || anon
        });
    }
 }