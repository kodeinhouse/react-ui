import React, { Component } from 'react';

export class Avatar extends Component
{
    render()
    {
        let { className, ...rest } = this.props;

        let classes = ['avatar'];

        return (
            <img className={classes.join(' ')} {...rest}/>
        );
    }
}
