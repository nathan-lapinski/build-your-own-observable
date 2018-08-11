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

  describe('Observable fron', () => {
    it('should consume an iterable and complete', (done: MochaDone) => {
      const x = [1, 2, 'three'];
      const expected = [1, 2, 'three'];
      let i = 0;

      Observable.from(x)
        .subscribe((val) => {
          expect(val).to.equal(expected[i++]);
        }, (err) => {
          done(new Error('should not be called'));
        }, () => {
          done();
      });
    });

    it('should consume any iterable, including one from a generator', (done: MochaDone) => {
      function* foo(){
        yield 1;
        yield 2;
      };

      const expected = [1,2];
      let i = 0;
    
      Observable.from(foo()).subscribe((x: number) => {
        expect(x).to.equal(expected[i++]);
      }, (err: any) => {
        done(new Error('should not be called'));
      }, () => {
        done();
      });
    });
  });

});