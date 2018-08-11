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
        return new Observable((observer) => {
            args.forEach(val => observer.onNext(val));
            observer.onCompleted();

            return {
                unsubscribe: () => {
                    // just make sure none of the original subscriber's methods are ever called.
                    observer = {
                        onNext: () => {},
                        onError: () => {},
                        onCompleted: () => {}
                    };
                }
            };
        });
    }

    static from(iterable): Observable {
        return new Observable((observer) => {
            for (let item of iterable) {
                observer.onNext(item);
            }            

            observer.onCompleted();

            return {
                unsubscribe: () => {
                    // just make sure none of the original subscriber's methods are ever called.
                    observer = {
                        onNext: () => {},
                        onError: () => {},
                        onCompleted: () => {}
                    };
                }
            };
        });
    }

    static fromEvent(source, event): Observable {
        return new Observable((observer) => {
            const callbackFn = (e) => observer.onNext(e);

            source.addEventListener(event, callbackFn);

            return {
                unsubscribe: () => source.removeEventListener(event, callbackFn)
            };
        });
    }
 }