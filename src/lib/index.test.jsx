import React from 'react'
import renderer from 'react-test-renderer'

import { describe, expect, test } from 'vitest'
import SplitMatch from './index'

const strNYC = 'New York City, New York, United States'
const strNewNewNew = 'New, New, New'

const SplitComponent = (props) => {
  const { children, index } = props
  const className = `split${index}`
  return <span className={className}>{children}</span>
}

const MatchComponent = (props) => {
  const { children } = props
  return <span className="match">{children}</span>
}

describe('SplitMatch', () => {
  test('renders correctly when there is nothing to split or match', () => {
    const component = renderer.create(
      <SplitMatch>foobar</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders correctly when only splitting', () => {
    const component = renderer.create(
      <SplitMatch>{strNYC}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders correctly when splitting and matching', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={false}
        globalSplit={false}
        includeSeparator={true}
        searchText={'New York City, New'}
        separator=",">{strNYC}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('splits first only', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={false}
        globalSplit={false}
        includeSeparator={true}
        searchText={'New'}
        separator=",">{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('splits globally', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={false}
        globalSplit={true}
        includeSeparator={true}
        searchText={'New'}
        separator=",">{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('matches first only', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={false}
        globalSplit={true}
        includeSeparator={true}
        searchText={'New'}
        separator=",">{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('matches globally', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={true}
        globalSplit={true}
        includeSeparator={true}
        searchText={'New'}
        separator=",">{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('matches across splits', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={true}
        globalSplit={true}
        includeSeparator={true}
        searchText={'w, N'}
        separator=",">{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('does not split if cases do not match', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={true}
        globalMatch={true}
        globalSplit={true}
        includeSeparator={true}
        searchText={'New'}
        separator="n">{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('splits if cases do match', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={true}
        globalMatch={true}
        globalSplit={true}
        includeSeparator={true}
        searchText={'New'}
        separator="N">{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('does not match if cases do not match', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={true}
        caseSensitiveSplit={false}
        globalMatch={true}
        globalSplit={false}
        includeSeparator={true}
        searchText={'new'}
        separator=",">{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('removes all separators if globalSplit', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={true}
        globalSplit={true}
        includeSeparator={false}
        searchText={'new'}
        separator=",">{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('removes first separator if not globalSplit', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={true}
        globalSplit={false}
        includeSeparator={false}
        searchText={'new'}
        separator=",">{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('uses SplitComponent when supplied as prop', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={true}
        globalSplit={true}
        includeSeparator={false}
        searchText={'new'}
        separator=","
        SplitComponent={SplitComponent}>{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('uses MatchComponent when supplied as prop', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={true}
        globalSplit={true}
        includeSeparator={false}
        searchText={'new'}
        separator=","
        MatchComponent={MatchComponent}>{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('uses both SplitComponent and MatchComponent when supplied as props', () => {
    const component = renderer.create(
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={true}
        globalSplit={true}
        includeSeparator={false}
        searchText={'new'}
        separator=","
        SplitComponent={SplitComponent}
        MatchComponent={MatchComponent}>{strNewNewNew}</SplitMatch>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})