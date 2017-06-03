import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid } from './Grid';
import { VerticalLayout } from '../../box/VerticalLayout';
import { RowGroup } from './RowGroup';

// TODO: Implement the ColumnGroup tag for the column widths

export class GroupingGrid extends Grid
{
    constructor(props)
    {
        super(props);

        this.onExpandCollapse = this.onExpandCollapse.bind(this);
    }

    onExpandCollapse(group, state)
    {
        // Set the groups
        let groups = this.state.groups || [];

        if(groups[group] == null)
            groups[group] = {};

        groups[group].state = state;

        this.setState({groups: groups});
    }

    getRowSample(body)
    {
        return body.querySelector("tr.grid-row");
    }

    getGroups(field, data)
    {
        let values = data.map(c => { return c[field];});

        return Array.from(new Set(values));
    }

    createGroup(group, data, columns, width)
    {
        let self = this;
        let master = <RowGroup span={columns.length} name={group.name} state={group.state} onExpandCollapse={this.onExpandCollapse} />;

        let detail = [];

        if(group.state != 'collapsed')
            detail = this.createRows(data, columns, width);

        return [master, detail];
    }

    getRecords(columns, width)
    {
        if(this.props.group)
        {
            let self = this;
            let data = this.sortData();
            let field = this.props.group;
            let groups = this.getGroups(field, data);
            let items = this.state.groups || [];

            return groups.map(function(group){
                // Filter the records based on each group
                let subset = data.filter( c => c[field] == group);
                let state = items[group] != null ? items[group].state : 'expanded';

                return self.createGroup({name: group, state: state}, subset, columns, width);
            });
        }
        else
            return super.getRecords(columns, width);
    }
}
