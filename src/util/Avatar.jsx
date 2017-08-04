import React, { Component } from 'react';

export class Avatar extends Component
{
    render()
    {
        let classes = ['avatar'];

        return (
            <img className={classes.join(' ')} src={this.props.src} />
        );
    }
}
