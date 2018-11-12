import React, { ChangeEvent } from 'react'
import { ResizableDelta, Rnd, Position } from 'react-rnd'
import '../App.scss'
import Modal from 'react-modal'
import MapType from '../types/MapType'
import { FaTrash, FaEdit, FaTimesCircle } from 'react-icons/fa'

interface Props {
  id: number
  map: MapType
  onNameChange?: (index: number, name: string) => void
  onPositionChange?: (index: number, x: number, y: number) => void
  onResize?: (index: number, width: number, height: number) => void
  onDelete?: (index: number) => void
}

interface State {
  map: MapType
  name: string
  showEdit: boolean
}

export default class Map extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...props,
      name: props.map.fileName,
      showEdit: false,
    }
  }

  showEdit() {
    this.setState({ showEdit: true })
  }

  handleOnChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name: string = e.currentTarget.value
    this.setState({ name })
  }

  submitName() {
    const { name } = this.state
    const { onNameChange, id } = this.props
    if (onNameChange) {
      onNameChange(id, name)
    }

    this.setState({ showEdit: false })
  }

  handleOnDragStop(x: number, y: number) {
    const { onPositionChange, id } = this.props
    if (onPositionChange) {
      onPositionChange(id, x, y)
    }
  }

  handleOnResize(delta: ResizableDelta, position: Position) {
    const { map, onResize, id } = this.props
    this.handleOnDragStop(position.x, position.y)
    if (onResize) {
      onResize(id, map.width + delta.width, map.height + delta.height)
    }
  }

  handleDelete() {
    const { id, onDelete } = this.props
    if (onDelete) {
      onDelete(id)
    }
  }

  render() {
    const { showEdit, name } = this.state
    const { x, y, width, height, fileName } = this.props.map
    return (
      <>
        <Rnd
          enableUserSelectHack={false}
          className="Map"
          resizeGrid={[16, 16]}
          dragGrid={[16, 16]}
          size={{
            width: width,
            height: height,
          }}
          position={{
            x: x,
            y: y,
          }}
          onDragStop={(e, d) => {
            const x = Math.round(d.x / 16) * 16
            const y = Math.round(d.y / 16) * 16
            this.handleOnDragStop(x, y)
          }}
          onResizeStop={(e, direction, ref, delta, position) =>
            this.handleOnResize(delta, position)
          }
        >
          <div>
            <div className="Map-Name">{fileName}</div>
            <div className="Map-Toolbar">
              <FaTimesCircle
                className="IconButton Danger TopRight"
                onClick={() => this.handleDelete()}
              />
              <FaEdit
                className="IconButton Primary TopLeft"
                onClick={() => this.showEdit()}
              />
            </div>
          </div>
        </Rnd>
        <Modal
          ariaHideApp={false}
          isOpen={showEdit}
          contentLabel="Edit Map"
          className="Modal"
          overlayClassName="Overlay"
        >
          <input
            type="text"
            value={name}
            onChange={e => this.handleOnChangeName(e)}
          />
          <button onClick={() => this.submitName()}>Done</button>
        </Modal>
      </>
    )
  }
}
