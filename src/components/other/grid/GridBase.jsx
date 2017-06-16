import React, { Component } from 'react';
import { TableColumnHeader } from './TableColumnHeader';

export class GridBase extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            sortOrder: null,
            sortField: null
        };

        this.getHeader = this.getHeader.bind(this);
    }

    getHeader(column, row, index, content, width)
    {
        let key = "th-" + row + "-" + index;
        let colSpan = column.items ? column.items.length: column.colSpan;
        let align = column.align;

        return <TableColumnHeader
                        key={key}
                        index={index}
                        align={align}
                        colSpan={colSpan}
                        sort={column.dataIndex == this.state.sortField && column.dataIndex != null ? this.state.sortOrder : null}>
                        {content}
                </TableColumnHeader>;
    }

    getMoney(value, config)
    {
        value = !isNaN(value = parseFloat(value)) ? value : 0;

        value = value.toLocaleString('en-US', {style: 'currency', currency: config.currency, minimumFractionDigits: config.decimals, mmaximumFractionDigits: config.decimals});

        return value;
    }

    createRows(data, columns, width)
    {
        let self = this;

        return data.map(function(record, rowIndex){
            var cells = columns.map(function(column, columnIndex){
                var align = "align-" + (column.align ? column.align : "left");
                var data = null;

                if(column.renderer == null)
                {
                    data = record[column.dataIndex];

                    if(column.format != null)
                    {
                        let config = column.format;

                        if(typeof column.format == 'string')
                            config = {type: column.format};

                        if(config.type == 'money')
                        {
                            config = Object.assign({
                                decimals: 2,
                                currency: 'USD'
                            }, config);

                            // Implement Intl.NumberFormat
                            data = self.getMoney(data, config);
                        }
                    }
                }
                else
                    data = column.renderer(record);

                let style = Object.assign({}, {

                });


                return (<td key={"cell-" + rowIndex + "-" + columnIndex} className={"grid-cell-body " + align} colSpan={column.colSpan} style={style}><div className="text">{typeof data == 'boolean' ? data.toString() : data}</div></td>);
            });

            let classes = ['grid-row'];

            if(record.className)
                classes.push(record.className);

            return (<tr id={"tr-" + record._id} className={classes.join(' ')} data-index={rowIndex} key={"tr-" + rowIndex} data-id={record.id}>{cells}</tr>);
        });
    }
}
