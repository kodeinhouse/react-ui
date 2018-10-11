import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class Draggable extends React.Component {
    constructor(props) {
        super(props);

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    static get propTypes() {
        return {
            as: PropTypes.string
        };
    }

    onDragStart(event) {
        event.dataTransfer.setData('text', this.props.id);

        if(this.props.onDragStart)
            this.props.onDragStart(event, {source: this.props, setState: (target) => {this.setState({date: target.date})}});
    }

    onDragEnd(event) {
        if(this.props.onDragEnd)
            this.props.onDragEnd(event);
    }

    getComponentType(as) {
        return as;
    }

    render() {
        let { children, as, ...rest } = this.props;

        let props = {
            draggable: true,
            ...rest,
            onDragStart: this.onDragStart,
            onDragEnd: this.onDragEnd,
        };

        return React.createElement(this.getComponentType(as), {...props}, children);
    }
}

Draggable.Item = (props) => {
    if(typeof props == 'object')
    {
        let { as, children, ...rest } = props;

        return <Draggable as={as} {...rest}>{children}</Draggable>;
    }
    else {
        throw new "Draggable.Item can only be used as a declarative component (<Draggable.Item />).";
    }
};

const wrap = (component) => {
    let type = null;

    if(typeof component == 'string' || typeof component == 'function')
        type = component;
    else
        throw new "Unknown type in Draggable item";

    return class extends Draggable {
        getComponentType() {
            return type;
        }
    }
};

Draggable.createHOC = wrap;

class DnDArea extends React.Component {
    constructor(props) {
        super(props);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.position = {initialX: null, initialY: null, xOffset: 0, yOffset: 0};
    }

    static get propTypes() {
        return {
            allowedTypes: PropTypes.array.isRequired
        };
    }

    isValidSource(target) {
        let { allowedTypes } = this.props;

        return Array.from(target.classList).filter(c => allowedTypes.indexOf(c) != -1).length > 0;
    }

    componentDidMount() {
        let parent = ReactDOM.findDOMNode(this);

        parent.addEventListener('mousedown', this.onMouseDown);
    }

    onMouseMove(event) {
        let target = event.target;

        if(this.isValidSource(target))
        {
            event.preventDefault();
            event.stopPropagation();

            //this.position = {clientX: event.clientX, clientY: event.clientY};*/
            let currentX = event.clientX - this.position.initialX;
            let currentY = event.clientY - this.position.initialY;

            this.position.xOffset = currentX;
            this.position.yOffset = currentY;

            this.translate(currentX, currentY, target);

            /*target.hidden = true;

            let dropTarget = document.elementFromPoint(event.clientX, event.clientY);

            target.hidden = false;

            let timeslot = dropTarget.closest('.timeslot');

            if(timeslot != this.currentTimeslot)
            {
                if(this.currentTimeslot != null)
                    this.currentTimeslot.classList.remove('hover');

                if(timeslot != null)
                    timeslot.classList.add('hover');

                this.currentTimeslot = timeslot;
            }*/
        }
    }

    onMouseDown(event) {
        if(event.which == 1 && this.isValidSource(event.target))
        {
            document.addEventListener('mouseup', this.onMouseUp);
            document.addEventListener('mousemove', this.onMouseMove);

            //console.log({x: event.x, y: event.y, screenX: event.screenX, screenY: event.screenY, pageX: event.pageX, pageY: event.pageY, offsetX: event.offsetX, offsetY: event.offsetY, layerX: event.layerX, layerY: event.layerY, clientX: event.clientX, clientY: event.clientY});
            this.position.initialX = event.clientX - this.position.xOffset;
            this.position.initialY = event.clientY - this.position.yOffset;
        }
    }

    onMouseUp(event) {
        console.log('onMouseUp');
        let parent = ReactDOM.findDOMNode(this);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mousemove', this.onMouseMove);
    }

    translate(xPos, yPos, target) {
        target.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    render() {
        return this.props.children;
    }
}

Draggable.Area = DnDArea;
