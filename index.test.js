/* eslint-env jest */
import React from 'react'
import { isElement } from 'react-dom/test-utils'
import { create as render } from 'react-test-renderer'
import { createSerializer } from 'jest-emotion'
import Rebass, {
  Provider,
  hoc,
  theme,
  createComponent,
  util
} from './dist/index.cjs.js'
import * as emotion from 'emotion'

expect.addSnapshotSerializer(createSerializer(emotion))

test('exports an object', () => {
  expect(typeof Rebass).toBe('object')
})

Object.keys(Rebass).forEach(key => {
  test(`exports a ${key} component`, () => {
    const Comp = Rebass[key]
    const json = render(<Comp />).toJSON()
    expect(json).toMatchSnapshot()
    expect(typeof Comp).toBe('function')
    expect(isElement(<Comp />)).toBe(true)
  })
})

test('Provider renders', () => {
  const json = render(<Provider />).toJSON()
  expect(json).toMatchSnapshot()
})

test('hoc returns a component', () => {
  const Comp = hoc()('div')
  const json = render(<Comp />).toJSON()
  expect(typeof Comp).toBe('function')
  expect(isElement(<Comp />)).toBe(true)
  expect(json).toMatchSnapshot()
})

test('theme is an object', () => {
  expect(typeof theme).toBe('object')
  expect(Array.isArray(theme.breakpoints)).toBe(true)
  expect(Array.isArray(theme.space)).toBe(true)
  expect(Array.isArray(theme.fontSizes)).toBe(true)
  expect(Array.isArray(theme.weights)).toBe(true)
  expect(typeof theme.colors).toBe('object')
  expect(typeof theme.radius).toBe('number')
  expect(typeof theme.font).toBe('string')
  expect(typeof theme.monospace).toBe('string')
})

test('createComponent returns null with no config', () => {
  const a = createComponent({})
  expect(a).toBe(null)
})

test('createComponent returns a component', () => {
  const A = createComponent({
    tag: 'div',
    style: {
      color: 'tomato'
    }
  })
  expect(isElement(<A />)).toBe(true)
})

test('util.idx safely gets values', () => {
  const obj = {
    hello: {
      beep: {
        boop: 1
      }
    },
    hi: 'hello'
  }
  const a = util.idx('hello.beep.boop', obj)
  const b = util.idx('hello.not.an.actual.key', obj)
  const c = util.idx('hi', obj)
  expect(a).toBe(1)
  expect(b).toBe(null)
  expect(c).toBe('hello')
})

test('util.px adds px unit to numbers', () => {
  const a = util.px(1)
  const b = util.px('hello')
  expect(a).toBe('1px')
  expect(b).toBe('hello')
})

test('util.color returns a color from the theme', () => {
  const cx = util.color({ theme })
  const a = cx()
  const b = cx('green')
  const c = cx('red3')
  const d = cx('pink3')
  const e = cx('teal5')
  expect(a).toBe(theme.colors.blue)
  expect(b).toBe(theme.colors.green)
  expect(c).toBe(theme.colors.red3)
  expect(d).toBe(theme.colors.pink3)
  expect(e).toBe(theme.colors.teal5)
})

test('util.darken returns and rgba value', () => {
  const a = util.darken(1 / 2)
  expect(a).toBe('rgba(0, 0, 0, 0.5)')
})

test('util.caps returns a caps style object', () => {
  const a = util.caps({ caps: true })
  expect(a).toEqual({
    textTransform: 'uppercase',
    letterSpacing: '.2em'
  })
})

test('util.align returns text-align values', () => {
  const a = util.align({ left: true })
  const b = util.align({ center: true })
  const c = util.align({ right: true })
  const d = util.align({ justify: true })
  const e = util.align({})
  expect(a).toEqual({ textAlign: 'left' })
  expect(b).toEqual({ textAlign: 'center' })
  expect(c).toEqual({ textAlign: 'right' })
  expect(d).toEqual({ textAlign: 'justify' })
  expect(e).toEqual(null)
})
