import React, { Component } from 'react';

export class RowPreview extends Component
{
    constructor(props)
    {
        super(props);

        this.state = { state: 'collapsed'};

        this.onExpandCollapse = this.onExpandCollapse.bind(this);
    }

    onExpandCollapse(event)
    {
        event.preventDefault();
        event.stopPropagation();

        let state = (this.state.state == 'expanded' ? 'collapsed' : 'expanded');

        this.setState({state: state});

        if(this.props.onExpandCollapse)
            this.props.onExpandCollapse(this.props.name, state);
    }

    getMoney(value, config)
    {
        value = !isNaN(value = parseFloat(value)) ? value : 0;

        return this.getNumber(value, {style: 'currency', currency: config.currency, minimumFractionDigits: config.decimals, maximumFractionDigits: config.decimals});
    }

    getInteger(value, config)
    {
        return this.getNumber(value);
    }

    getDecimal(value, config)
    {
        return this.getNumber(value, {minimumFractionDigits: config.decimals, maximumFractionDigits: config.decimals});
    }

    getNumber(value, options)
    {
        return value.toLocaleString('en-US', options || {});
    }

    createRow(record, rowIndex){
        let buttonClasses = ['group-button', this.state.state];
        let records = this.props.records;

        var cells = this.props.columns.map(function(column, columnIndex){
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
                        data = this.getMoney(data, config);
                    }
                    else
                        if(config.type == 'integer')
                            data = this.getInteger(data, config);
                        else
                            if(config.type == 'decimal')
                                data = this.getDecimal(data, config);

                }
            }
            else
                data = column.renderer(record, rowIndex, records);

            let style = Object.assign({}, {

            });

            return (<td key={"cell-" + rowIndex + "-" + columnIndex} className={"grid-cell-body " + align} colSpan={column.colSpan} style={style}>
                        <div className="text" style={{overflow: (column.overflow ? 'visible' : 'hidden')}}>{columnIndex == 0 && <i className={buttonClasses.join(' ')} onClick={this.onExpandCollapse}></i>} {typeof data == 'boolean' ? data.toString() : data}</div>
                    </td>
            );
        }, this);

        let classes = ['grid-group', 'grid-row'];

        if(record.className)
            classes.push(record.className);

        return (<tr id={"tr-" + record._id} className={classes.join(' ')} data-index={rowIndex} key={"tr-" + (record._id || rowIndex)} data-id={record.id} onClick={self.onRowClick} onDoubleClick={self.onDoubleClick}>{cells}</tr>);
    }

    render()
    {
        let items = [this.createRow(this.props.data, this.props.index)];

        if(this.state.state == 'expanded')
            items.push(<tr><td colSpan="12">Hola</td></tr>);

        return items;
    }
}
