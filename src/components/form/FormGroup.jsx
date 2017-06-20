import React, { Component } from 'react';

export class FormGroup extends Component
{
    static get defaultProps()
    {
        return {
            layout: 'horizontal',
            label: 'left'
        };
    }

    render()
    {
        let classes = ['form-group'];

        if(this.props.layout)
            classes.push(this.props.layout);

        if(this.props.label)
            classes.push('label ' + this.props.label);

        return (
            <div className={classes.join(' ')}>
                {this.props.children}
            </div>
        );
    }
}
