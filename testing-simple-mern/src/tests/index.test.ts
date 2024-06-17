import { sum, mul } from "..";
import {describe , expect , it, test} from "@jest/globals"

describe('testing the sum function', () => {
    it('should return the sum of 1 and 3 correctly', () => {
        expect(sum(1,3)).toBe(4);
    });
    it('should return the sum of 1 and -1 correctly', () => {
        expect(sum(1,-1)).toBe(0);
    });
    it('should return the sum of 0 and 0 correctly', () => {
        expect(sum(0,0)).toBe(0);
    });
    it('should return the sum of 999999999999 and 3 correctly', () => {
        expect(sum(999999999999 ,3)).toBe(1000000000002);
    });
});

describe('testing mul function', () => {
  it('should return the multiplication of 2 and 6 correctly', ()=>{
    expect(mul(2,6)).toBe(12);
  });
});
