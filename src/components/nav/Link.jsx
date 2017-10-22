import React, { Component } from 'react';

export class Link extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            classes: ['link']
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }
    onMouseEnter(event)
    {
        if(this.props.onHoverClass)
            this.setState({classes: this.state.classes.concat(this.props.onHoverClass)});
    }
    onMouseLeave(event)
    {
        if(this.props.onHoverClass)
            this.setState({classes: this.state.classes.filter(c => c != this.props.onHoverClass)});
    }
    render()
    {
        let classes = this.state.classes;
        let style = Object.assign({}, this.props.style);

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.marginLeft)
            style.marginLeft = this.props.marginLeft;

        return <a   id={this.props.id}
                    className={classes.join(' ')}
                    href={this.props.path}
                    style={style}
                    onClick={this.props.onClick}
                    target={this.props.target}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}>{this.props.children}</a>;
    }
}
