/**
 * A very simply Observable class
 */

export class Observable {
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
    subscribe(onNext: any, onError?: any, onCompleted?: any) {
        if (typeof onNext === 'function') {
            return this._subscribe({
                onNext: onNext,
                onError: onError || (() => {}),
                onCompleted: onCompleted || (() => {})
            });
        } else {
            return this._subscribe(onNext);
        }
    }

    static of(...args): Observable {
        return new Observable((obs) => {
            args.forEach(val => obs.onNext(val));
            obs.onCompleted();
        });
    }

    static just(val): Observable {
        return new Observable((observer) => {
            observer.onNext(val);
            observer.onCompleted();
        });
    }
 }