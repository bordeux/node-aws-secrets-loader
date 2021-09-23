import test from 'ava';

import { normalizeValue } from './normalizeValue';

test('true conversion', (t) => {
  t.is(normalizeValue('true'), true);
});

test('false conversion', (t) => {
  t.is(normalizeValue('false'), false);
});

test('string conversion', (t) => {
  t.is(normalizeValue('123'), '123');
});

test('string conversion v2', (t) => {
  t.is(normalizeValue('test123'), 'test123');
});
