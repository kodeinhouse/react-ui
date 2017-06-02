import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid } from './Grid';
import { VerticalLayout } from '../box/VerticalLayout';

// TODO: Implement the ColumnGroup tag for the column widths

export class GroupingGrid extends Grid
{
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
        let master = (
            <tr className="grid-group">
                <td colSpan={columns.length}>
                    <i className="group-button collapse"></i><span className="text">{group}</span>
                </td>
            </tr>
        );

        let detail = this.createRows(data, columns, width);

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

            return groups.map(function(group){
                // Filter the records based on each group
                let subset = data.filter( c => c[field] == group);

                return self.createGroup(group, subset, columns, width);
            });
        }
        else
            return super.getRecords(columns, width);
    }
}
