import { Observable } from '../internal/Observable';

let obs = new Observable((observer) => {console.log('observer invoked')});

obs.subscribe((v) => {console.log(5)});