import React from 'react'
import SplitMatch from './lib'
import styles from './App.module.css'

const SplitComponent = (props) => {
  const { children, index } = props
  const className = `split${index}`

  return <span className={styles[className]}>{children}</span>
}

const MatchComponent = (props) => {
  const { children } = props

  return <span className={styles.match}>{children}</span>
}

const App = () => {
  return (
    <>
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={false}
        globalSplit={false}
        includeSeparator={true}
        searchText={'New York City, New'}
        separator=","
        MatchComponent={MatchComponent}
        SplitComponent={SplitComponent}>New York City, New York, United States</SplitMatch>
    </>
  )
}

export default App
