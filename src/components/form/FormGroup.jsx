import React, { Component } from 'react';

export class FormGroup extends Component
{
    static get defaultProps()
    {
        return {
            orientation: 'horizontal'
        };
    }

    render()
    {
        let classes = ['form-group'];

        if(this.props.orientation)
            classes.push(this.props.orientation);

        return (
            <div className={classes.join(' ')}>
                {this.props.children}
            </div>
        );
    }
}
