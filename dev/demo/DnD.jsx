import React, { Component } from 'react';
import { Draggable } from 'dnd';

export class DnD extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let style = {border: '1px solid lightgray', cursor: 'pointer', margin: '5px'};

        return (
            <Draggable.Area allowedTypes={['task']}>
                <List>
                    <Draggable as="li" className="task" style={style}>Task 1</Draggable>
                    <Draggable as="li" className="task" style={style}>Task 2</Draggable>
                    <Draggable as="li" className="task" style={style}>Task 3</Draggable>
                </List>
            </Draggable.Area>
        );
    }
}

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <ul style={{width: '200px'}} onMouseUp={this.props.onMouseUp}>{this.props.children}</ul>
        );
    }
}

const DraggableItem = Draggable.createHOC("li");
