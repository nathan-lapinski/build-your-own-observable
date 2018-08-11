import { Observable } from '../internal/Observable';
import { expect } from 'chai';
import 'mocha';

describe('Observable', () => {

  describe('Observable of', () => {
    it('should emit each input separately and complete', (done: MochaDone) => {
      const x = { foo: 'bar' };
      const expected = [1, 'a', x];
      let i = 0;

      Observable.of(1, 'a', x)
        .subscribe((val) => {
          expect(val).to.equal(expected[i++]);
        }, (err) => {
          done(new Error('should not be called'));
        }, () => {
          done();
      });
    });

    it('should emit one value', (done: MochaDone) => {
      let calls = 0;
    
      Observable.of(42).subscribe((x: number) => {
        expect(++calls).to.equal(1);
        expect(x).to.equal(42);
      }, (err: any) => {
        done(new Error('should not be called'));
      }, () => {
        done();
      });
    });
  });

});