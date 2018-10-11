import React from 'react';
import PropTypes from 'prop-types';

export class Droppable extends React.Component {
    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
    }

    static get propTypes() {
        return {
            as: PropTypes.string
        };
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDragEnter(event) {
        event.target.classList.add('hover');

        if(this.props.onDragEnter)
            this.props.onDragEnter(event, {target: this.props});
    }

    onDragLeave(event) {
        event.target.classList.remove('hover');
    }

    onDrop(event) {
        event.target.classList.remove('hover');
        if(this.props.onDrop)
            this.props.onDrop(event, this.props);
    }

    getComponentType(as) {
        return as;
    }

    render() {
        let { children, as, ...rest } = this.props;

        let props = {
            draggable: true,
            ...rest,
            // We assign these properties last to prevent any override
            onDrop: this.onDrop,
            onDragOver: this.onDragOver,
            onDragEnter: this.onDragEnter,
            onDragLeave: this.onDragLeave
        };

        return React.createElement(this.getComponentType(as), {...props}, children);
    }
}

Droppable.Item = (props) => {
    if(typeof props == 'object')
    {
        let { as, children, ...rest } = props;

        return <Droppable as={as} {...rest}>{children}</Droppable>;
    }
    else {
        throw new "Droppable.Item can only be used as a declarative component (<Droppable.Item />).";
    }
};

const wrap = (component) => {
    let type = null;

    if(typeof component == 'string' || typeof component == 'function')
        type = component;
    else
        throw new "Unknown type in Droppable item";

    return class extends Droppable {
        getComponentType() {
            return type;
        }
    }
};

Droppable.createHOC = wrap;
