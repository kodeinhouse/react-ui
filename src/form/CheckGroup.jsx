import React, { Component } from 'react';

export class CheckGroup extends Component
{
    render()
    {
        let classes = ["check", "group"];

        if(this.props.className)
            classes.push(this.props.className);

        return (
            <div className={classes.join(' ')}>
                {this.props.children}
            </div>
        );
    }
}
