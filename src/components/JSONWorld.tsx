import React, { ChangeEvent } from "react";
import WorldType from "../types/WorldType";

interface Props {
  world: WorldType;
  onWorldChange: (world: WorldType) => void;
}

export default class JSONWorld extends React.Component<Props> {
  onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const newWorld = e.target.value;
    this.props.onWorldChange(JSON.parse(newWorld));
  }

  render() {
    return (
      <textarea
        value={JSON.stringify(this.props.world)}
        onChange={e => this.onChange(e)}
      />
    );
  }
}
