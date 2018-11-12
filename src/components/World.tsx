import React, { ChangeEvent } from 'react'
import Map from './Map'
import './../App.scss'
import WorldType from '../types/WorldType'
import MapType from '../types/MapType'
import JSONWorld from './JSONWorld'

interface Props {
  world: WorldType
  viewport: { width: number; height: number }
  unit: number
}

interface State {
  world: WorldType
  showWorld: boolean
}

export default class World extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      world: props.world,
      showWorld: false,
    }
  }

  loadWorld(world: WorldType) {
    this.setState({ world })
  }

  onMapNameChange(id: number, name: string) {
    const { world } = this.state
    world.maps[id].fileName = name

    this.setState({ world })
  }

  onMapPositionChange(id: number, x: number, y: number) {
    const { world } = this.state
    world.maps[id].x = x
    world.maps[id].y = y

    this.setState({ world })
  }

  onMapResize(id: number, width: number, height: number) {
    const { world } = this.state
    world.maps[id].width = width
    world.maps[id].height = height

    this.setState({ world })
  }

  onMapDelete(index: number) {
    const { world } = this.state
    world.maps.splice(index, 1)

    this.setState({ world })
  }

  shiftWorld(dx: number, dy: number) {
    const { unit } = this.props
    const { world } = this.state
    world.maps.forEach(map => {
      map.x += unit * dx
      map.y += unit * dy
    })
    this.setState({ world })
  }

  addMap() {
    const { viewport } = this.props
    const { width, height } = viewport
    const { world } = this.state
    const newIndex = world.maps.length
    world.maps.push({
      fileName: `new-map-${newIndex}.tmx`,
      x: 0,
      y: 0,
      width: width,
      height: height,
    })

    this.setState({ world })
  }

  showJSON() {
    const { showWorld } = this.state
    this.setState({ showWorld: !showWorld })
  }

  autoRename(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value
    const { world } = this.state

    world.maps.forEach((map, index) => {
      world.maps[index].fileName = `${name}-${index}.tmx`
    })

    this.setState({ world })
  }

  renderMap(map: MapType, index: number) {
    return (
      <Map
        key={`${index}-${map.fileName}`}
        id={index}
        map={map}
        onNameChange={(index, name) => this.onMapNameChange(index, name)}
        onPositionChange={(index, x, y) =>
          this.onMapPositionChange(index, x, y)
        }
        onResize={(index, width, height) =>
          this.onMapResize(index, width, height)
        }
        onDelete={index => this.onMapDelete(index)}
      />
    )
  }

  render() {
    const { world, showWorld } = this.state
    const { maps } = world
    console.log(world)
    return (
      <>
        <div className="World-Toolbar">
          <button onClick={() => this.shiftWorld(-1, 0)}>&larr;</button>
          <button onClick={() => this.shiftWorld(1, 0)}>&rarr;</button>
          <button onClick={() => this.shiftWorld(0, -1)}>&uarr;</button>
          <button onClick={() => this.shiftWorld(0, 1)}>&darr;</button>
          <button onClick={() => this.addMap()}>ADD</button>
          <button onClick={() => this.showJSON()}>JSON</button>
          <input onChange={e => this.autoRename(e)} />
        </div>
        {showWorld && (
          <div className="World-JSON">
            <JSONWorld
              world={world}
              onWorldChange={world => this.loadWorld(world)}
            />
          </div>
        )}
        <div className="ParentApp">
          <div className="App">
            {maps.map((map, index) => this.renderMap(map, index))}
          </div>
        </div>
      </>
    )
  }
}
