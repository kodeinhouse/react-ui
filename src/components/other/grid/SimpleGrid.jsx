import React, { Component } from 'react';
import { GridBase } from './GridBase';

export class SimpleGrid extends GridBase
{
    renderHeader()
    {
        let self = this;

        let cells = this.props.columns.map(function(column, index){
            return self.getHeader(column, 0, index, column.header);
        });

        return <tr>{cells}</tr>;
    }

    renderBody()
    {
        return this.createRows(this.props.records, this.props.columns);
    }

    render()
    {
        return (
            <table className="grid" style={this.props.style}>
                <caption>{this.props.title}</caption>
                <thead>
                    {this.renderHeader()}
                </thead>
                <tbody>
                    {this.renderBody()}
                </tbody>
            </table>
        );
    }
}
