import React, { Component } from 'react'
import './App.scss'
import World from './components/World'

const displayUnit = 16
const worldUnit = 16
const defaults = {
  viewportWidth: worldUnit * 25,
  viewportHeight: worldUnit * 14,
  unit: worldUnit,
}

const world = {
  maps: [
    {
      fileName: 'intro-10.tmx',
      x: 400,
      y: 672,
      width: 1200,
      height: 224,
    },
    { fileName: 'intro-3.tmx', x: 1600, y: 224, width: 400, height: 672 },
    {
      fileName: 'intro-4.tmx',
      x: 2400,
      y: 448,
      width: 400,
      height: 448,
    },
    { fileName: 'intro-80.tmx', x: 2000, y: 672, width: 400, height: 224 },
    {
      fileName: 'new-map.tmx',
      x: 1200,
      y: 224,
      width: 400,
      height: 224,
    },
  ],
  type: 'world',
}

class App extends Component {
  render() {
    const { viewportWidth, viewportHeight } = defaults
    return (
      <World
        world={world}
        unit={defaults.unit}
        viewport={{ width: viewportWidth, height: viewportHeight }}
      />
    )
  }
}

export default App
