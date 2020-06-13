import { expect } from 'chai'
import jcsv from '.';


describe('jcsv()', () => {
    it('should convert to csv', () => {
        const data = [
            {
                b: true,
                n: 700
            },
            {
                b: false,
                n: 1000,
                s: 'hello there'
            },
            {
                b: false,
                n: 1,
                d: Date.now()
            }
        ];
        const csv = jcsv(data);
        const split = csv.split('\n');
        expect(split.length).to.equal(4);
        split.forEach(line => expect(line).to.match(/.*,.*,.*,.*/))
    })

    it('should serialize arrays', () => {
        const data = [{ a: ['hello', 'there'] }];
        const csv = jcsv(data);
        expect(csv).to.equal('a\n"hello,there"')
    })

    it('should serialize complex strings', () => {
        const data = [{ a: 'hello, world!' }];
        const csv = jcsv(data);
        expect(csv).to.equal('a\n"hello, world!"')
    })
})
