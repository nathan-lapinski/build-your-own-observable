/**
 * A very simply Observable class
 */

 export class Observable<T> {
     /** Internal implementation detail */
     private _subscribe;

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
 }