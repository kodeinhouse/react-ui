import React, { Component } from 'react';
import { Container } from '../container/Container';

export class FieldGroup extends Component
{
    render()
    {
        let classes = ['group'];
        let props = Object.assign({}, this.props);

        if(this.props.className)
            classes.push(this.props.className);

        props.className = classes.join(' ');

        let children = React.Children.map(this.props.children, function(child, index){
            if(child != null)
            {
                return React.cloneElement(child, {
                    labelWidth: child.labelWidth || props.labelWidth,
                    labelAlign: child.labelAlign || props.labelAlign
                });
            }
            else
                return child;
        });

        return (
            <Container {...props}>
                {children}
            </Container>
        );
    }
}
