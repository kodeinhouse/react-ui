import React, { Component } from 'react';

export class TableColumnHeader extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            sort: this.props.sort
        };

        this.onClick = this.onClick.bind(this);
    }
    onClick()
    {
        if(this.props.onClick)
            this.props.onClick(this);
    }
    render()
    {
        let sort = null;
        let align = "align-" + (this.props.align ? this.props.align : "left"); // TODO: align property shouldn't have a default
        let classes = ['grid-cell-header', align];

        if(this.props.sort)
            sort = <span className={['arrow', this.props.sort == 'ASC' ? 'up' : 'down'].join(' ')}></span>;

        return (
                <th colSpan={this.props.colSpan}
                    className={classes.join(' ')}
                    onClick={this.onClick}>
                        <div className="text">{this.props.children}{sort}</div>
                </th>);
    }
}
