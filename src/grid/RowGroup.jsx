import React, { Component } from 'react';

export class RowGroup extends Component
{
    static get defaultProps(){
        return {
            state: 'expanded'
        };
    }

    constructor(props)
    {
        super(props);

        this.onExpandCollapse = this.onExpandCollapse.bind(this);
    }

    onExpandCollapse(event)
    {
        event.preventDefault();
        event.stopPropagation();

        let state = (this.props.state == 'expanded' ? 'collapsed' : 'expanded');

        if(this.props.onExpandCollapse)
            this.props.onExpandCollapse(this.props.name, state);
    }

    render()
    {
        let classes = ['group-button', this.props.state];

        return (
            <tr className="grid-group">
                <td colSpan={this.props.span}>
                    <i className={classes.join(' ')} onClick={this.onExpandCollapse}></i><span className="text">{this.props.name}</span>
                </td>
            </tr>
        );
    }
}
