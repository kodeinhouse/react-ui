import React, { Component } from 'react';
import EventEmitter from 'wolfy87-eventemitter';
console.log(EventEmitter);

export class DnD extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    onMouseMove(event) {
        let draggedElement = this.draggedElement;

        if(draggedElement)
        {
            let dimension = draggedElement.getBoundingClientRect();
            console.log(dimension);
            //draggedElement.style.position = 'absolute';
            //draggedElement.style.width = dimension.width + 'px';
            //draggedElement.style.left = dimension.x + 'px';
            //draggedElement.style.top = (event.clientY - (dimension.height / 2)) + 'px';
            draggedElement.style.height = (event.clientY - dimension.y) + 'px';
        }
    }

    onMouseDown(event) {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);

        this.draggedElement = event.target;
    }

    onMouseUp(event) {
        console.log('onMouseUp');
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    render() {
        return (
            <List>
                <Item emitter={this.eventEmitter} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>Task 1</Item>
                <Item emitter={this.eventEmitter} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>Task 2</Item>
                <Item emitter={this.eventEmitter} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>Task 3</Item>
            </List>
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

class Item extends Component {
    constructor(props) {
        super(props);

        this.onMouseDown = this.onMouseDown.bind(this);
    }

    onMouseDown(event) {
        if(this.props.onMouseDown)
            this.props.onMouseDown(event);
    }

    render() {
        return (
            <li draggable={false}
                onMouseDown={this.onMouseDown}
                style={{border: '1px solid lightgray', margin: '5px 0px', cursor: 'pointer'}}>{this.props.children}</li>
        );
    }
}
