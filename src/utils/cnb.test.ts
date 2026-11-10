import { describe, expect, it } from 'vitest'
import fixture from '../test/fixtures/cnb-rates.txt?raw'
import { CnbParseError, parseCnbRates } from './cnb'

// The fixture is synthetic CNB-format data with simple quotes, not a historical fixing.
describe('parseCnbRates', () => {
  it('parses fixing metadata and preserves quote quantities and source order', () => {
    expect(parseCnbRates(fixture)).toEqual({
      publishedAt: '2026-11-06',
      sequence: 214,
      rates: [
        { country: 'EMU', currency: 'euro', amount: 1, code: 'EUR', rate: 25 },
        { country: 'Hungary', currency: 'forint', amount: 100, code: 'HUF', rate: 6.25 },
        { country: 'Japan', currency: 'yen', amount: 100, code: 'JPY', rate: 12.5 },
        { country: 'Indonesia', currency: 'rupiah', amount: 1000, code: 'IDR', rate: 1.25 },
        { country: 'Turkey', currency: 'lira', amount: 100, code: 'TRY', rate: 40 },
      ],
    })
  })

  it('accepts a BOM, CRLF, trailing blank lines, and whitespace in fields', () => {
    const input = `\uFEFF${fixture.replace('EMU|euro', ' EMU | euro ').replace(/\n/g, '\r\n')}\r\n\r\n`
    expect(parseCnbRates(input)).toEqual(parseCnbRates(fixture))
  })

  it.each([
    ['missing metadata', fixture.split('\n').slice(1).join('\n')],
    ['malformed metadata', fixture.replace('#214', '214')],
    ['impossible date', fixture.replace('06 Nov', '31 Nov')],
    ['invalid month', fixture.replace('Nov', 'Foo')],
    ['zero sequence', fixture.replace('#214', '#0')],
    ['unsafe sequence', fixture.replace('#214', '#9007199254740992')],
    ['wrong header', fixture.replace('Country|Currency', 'Currency|Country')],
    ['header only', fixture.split('\n').slice(0, 2).join('\n')],
    ['wrong field count', fixture.replace('EMU|euro|1|EUR|25.000', 'EMU|euro|1|EUR')],
    ['empty country', fixture.replace('EMU|', '|')],
    ['empty currency', fixture.replace('|euro|', '||')],
    ['invalid code', fixture.replace('|EUR|', '|eur|')],
    ['fractional quantity', fixture.replace('|1|EUR', '|1.5|EUR')],
    ['zero quantity', fixture.replace('|1|EUR', '|0|EUR')],
    ['negative quantity', fixture.replace('|1|EUR', '|-1|EUR')],
    ['unsafe quantity', fixture.replace('|1|EUR', '|9007199254740992|EUR')],
    ['partial rate', fixture.replace('25.000', '25.000oops')],
    ['zero rate', fixture.replace('25.000', '0')],
    ['negative rate', fixture.replace('25.000', '-25')],
    ['infinite rate', fixture.replace('25.000', 'Infinity')],
    ['NaN rate', fixture.replace('25.000', 'NaN')],
    ['duplicate code', `${fixture.trimEnd()}\nEMU|euro|1|EUR|25.000`],
    ['interior blank row', fixture.replace('Hungary|', '\nHungary|')],
  ])('rejects %s instead of returning partial data', (_description, input) => {
    expect(() => parseCnbRates(input)).toThrow(CnbParseError)
  })
})
