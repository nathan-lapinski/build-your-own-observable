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

    /**
     * Operators
     */

     /**
      * map takes a projection function, and applies it to each value emitted by the input stream, and emits the
      * result to the output stream.
      */
     map(projectionFn): Observable {
        return new Observable((observer) => {
            return this.subscribe(
                (val) => observer.onNext(projectionFn(val)),
                (e) => observer.onError(e),
                () => observer.onCompleted()
            );
        });
    }

    filter(predicateFn): Observable {
        return new Observable((observer) => {
            return this.subscribe(
                (val) => {
                    // only emit the value if it passes the filter function
                    if (predicateFn(val)) {
                        observer.onNext(val);
                    }
                },
                (e) => observer.onError(e),
                () => observer.onCompleted()
            );
        });
    }

    take(count: number): Observable {
        return new Observable((observer) => {
            let currentCount = 0;
            return this.subscribe(
                (val) => {
                    if (currentCount++ < count) {
                        observer.onNext(val);
                    } else {
                        observer.onCompleted();
                    }
                },
                (e) => observer.onError(e),
                () => observer.onCompleted()
            );
        });
    }
}