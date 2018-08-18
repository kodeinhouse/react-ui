import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid } from './Grid';
import { RowPreview } from './RowPreview';
import { clone } from 'lodash';

// TODO: Implement the ColumnGroup tag for the column widths

export class GridPreview extends Grid
{
    constructor(props)
    {
        super(props);
    }

    getRowSample(body)
    {
        return body.querySelector("tr.grid-row");
    }

    getRecords(columns, width)
    {
        return this.props.records.map((c, index) => { return <RowPreview key={`row-prev-${index}`} records={this.props.records} columns={columns} data={c} onExpandCollapse={this.props.onExpandCollapse}/>;});
    }
}
