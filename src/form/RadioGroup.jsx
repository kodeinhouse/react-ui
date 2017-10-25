import React, { Component } from 'react';

export class RadioGroup extends Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(field, value)
    {
        if(this.props.onChange)
            this.props.onChange(field, value);
    }

    createOptions(name)
    {
        let self = this;
        let props = this.props;

        return React.Children.map(this.props.children, function(child, index){

            return React.cloneElement(child, {
                name: name,
                checked: props.value == child.props.value,
                onChange: self.onChange
            });
        });
    }

    render()
    {
        let classes = ["radio", "group"];

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.stacked)
            classes.push('stacked');

        return (
            <div className={classes.join(' ')} style={this.props.style}>
                {this.createOptions(this.props.name)}
            </div>
        );
    }
}
