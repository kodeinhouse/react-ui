import React, { Component } from 'react';

export class Chart extends Component{
    render(){
        let classes = ['chart'];
        let { children, className, ...props } = this.props;

        if(className)
            classes.push(className);

        return (
            <svg className={classes.join(' ')} {...props}>
                {children}
            </svg>
        );
    }
}
