import { Observable } from '../internal/Observable';

let obs = new Observable((observer) => {console.log('observer invoked')});

obs.subscribe((v) => {console.log(5)});

let obs2 = Observable.of(1,2,3).subscribe(console.log);