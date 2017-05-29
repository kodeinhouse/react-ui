import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel } from './Panel';
import { VerticalLayout } from '../box/VerticalLayout';

// TODO: Implement the ColumnGroup tag for the column widths

export class Grid extends Panel
{
    static get defaultProps(){
        return {
            mode: 'normal' // available options are auto, fit
        };
    }
    constructor(props)
    {
        super(props);

        this.state = {
            records: props.records || [],
            sortField: null,
            sortOrder: null
        };

        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.getHeader = this.getHeader.bind(this);
        this.onHeaderClick = this.onHeaderClick.bind(this);
    }
    onHeaderClick(column)
    {
        let config = this.getColumnConfig(column.props.index);

        if(config.dataIndex != null)
        {
            let sort = null;

            if(config.dataIndex == this.state.sortField)
                sort = new Sort(config.dataIndex, this.state.sortOrder).toggle();
            else
                sort = new Sort(config.dataIndex);

            this.setSort(sort.field, sort.order);
        }
    }

   componentWillReceiveProps(nextProps)
   {
      this.setState({sortField: nextProps.column, sortOrder: nextProps.order, records: nextProps.records});
   }

    setSort(column, order)
    {
        if(typeof column == 'number')
            column = this.getColumnConfig(column).dataIndex;

        this.setState({sortField: column, sortOrder: order});
    }
    onDoubleClick(event)
    {
        let row = event.target.closest("tr");

        if(row != null)
        {
            if(this.props.onRowDoubleClick)
                this.props.onRowDoubleClick(this.getRecord(this.getRowIndex(row)));
        }
    }
    getRowIndex(row)
    {
        return row != null ? row.dataset.index : null;
    }
    getRowSample(body)
    {
        return body.querySelector("tr");
    }
    getResizeElement(bodyWrapper)
    {
        return bodyWrapper;
    }
    componentDidMount()
	{
        const ElementQueries = require("css-element-queries/src/ElementQueries");
        const ResizeSensor = require("css-element-queries/src/ResizeSensor");

        ElementQueries.listen();
        ElementQueries.init();

        let self = this;
        let dom = ReactDOM.findDOMNode(this);
        let headerWrapper = dom.querySelector(".grid-hd-wrapper");
        let bodyWrapper = dom.querySelector(".grid-bd-wrapper");

        bodyWrapper.addEventListener('scroll', function(){
            headerWrapper.scrollLeft = this.scrollLeft;
        });

        let body = bodyWrapper.querySelector(".grid-body");
        let header = headerWrapper.querySelector(".grid-header");

        var onResize = function(element){
            // If the body scroll is visible then display the vertical scroll to keep the same width
            if(bodyWrapper.scrollHeight > bodyWrapper.clientHeight)
                headerWrapper.style.overflowY = 'scroll';
            else
                headerWrapper.style.overflowY = null;

            self.resizeColumns(header, body);
        };

        let resizeElement = this.getResizeElement(bodyWrapper);

        // Start sensor to detect resize
        new ResizeSensor(resizeElement, onResize);

        // Check manually the first time
        onResize();
	}
    componentDidUpdate(prevProps, prevState)
    {
        let dom = ReactDOM.findDOMNode(this);
        let headerWrapper = dom.querySelector(".grid-hd-wrapper");
        let bodyWrapper = dom.querySelector(".grid-bd-wrapper");

        let body = bodyWrapper.querySelector(".grid-body");
        let header = headerWrapper.querySelector(".grid-header");

        this.resizeColumns(header, body);
        this.validateSelection();
    }
    resizeColumns(header, body)
    {
        let self = this;

        // This will retrieve the first row
        let row = self.getRowSample(body);

        if(row != null)
        {
            let headerColumnGroup = self.getColumnGroup(header);
            let bodyColumnGroup = self.getColumnGroup(body);

            let bodyCells = row.querySelectorAll("td");
            let headerCells = header.querySelectorAll("th");

            let columnConfig = null;
            let columnWidth = null;
            let minWidth = null;

            self.setColumnsWidth(bodyCells);

            bodyCells.forEach(function(column, index){

                columnConfig = self.props.columns[index];
                minWidth = columnConfig.minWidth || 50;
                columnWidth = column.getBoundingClientRect().width;

                headerCells[index].style.width = columnWidth + 'px';
                headerCells[index].style.minWidth = columnWidth + 'px';
                headerCells[index].style.maxWidth = columnWidth + 'px';
            });
        }
        else
            self.setHeadersWidth(header.querySelectorAll("th"));
    }
    setHeadersWidth(headers)
    {
        this.setColumnsWidth(headers);
    }
    getColumnGroup(element)
    {
        let columnGroup = element.querySelector("colgroup");

        if(columnGroup == null)
        {
            columnGroup = element.appendChild(document.createElement("colgroup"));

            for(let i = 0; i < this.props.columns.length; i++)
                columnGroup.appendChild(document.createElement("col"));
        }

        return columnGroup;
    }
    getColumnWidth(width)
    {
        let result = width instanceof Number ? width + 'px' : width

        return result;
    }
    setColumnsWidth(columns)
    {
        let self = this;

        columns.forEach(function(column, index){
            let columnConfig = self.getColumnConfig(index);

            if(columnConfig.width)
                column.style.width = self.getColumnWidth(columnConfig.width);
            else
                column.style.width = null;

            if(columnConfig.minWidth)
                column.style.minWidth = self.getColumnWidth(columnConfig.minWidth);
            else
                column.style.minWidth = null;

            if(columnConfig.maxWidth)

                column.style.maxWidth = self.getColumnWidth(columnConfig.maxWidth);
            else
                column.style.maxWidth = null;
        });
    }
	onRowClick(event)
    {
        let dom = ReactDOM.findDOMNode(this);
        let target = event.target.closest("tr");
        let current = dom.querySelector('.x-selected');
        let targetIndex = this.getRowIndex(target);
        let currentIndex = this.getRowIndex(current);

        if(this.props.onRowClick)
            this.props.onRowClick(this.getRecord(this.getRowIndex(target)));

        if(targetIndex != currentIndex)
        {
            if(current != null)
                current.classList.remove('x-selected');

            target.classList.add('x-selected');

            this.onSelectionChange(this.getRecord(targetIndex), this.getRecord(currentIndex));
        }
        else
            if(event.ctrlKey)
            {
                if(target != null)
                    target.classList.remove('x-selected');

                this.onSelectionChange(null, this.getRecord(currentIndex));
            }
    }
    onSelectionChange(current, previous)
    {
        if(this.props.onSelectionChange)
        {
            this.currentSelection = current;
            this.props.onSelectionChange(current, previous);
        }
    }
    validateSelection()
    {
        let selected = this.getSelectedRecord();
        let previous = this.currentSelection;

        // TODO: Add an id property to remove this hardcoded _id
        let selectedId = selected != null ? selected._id : null;
        let previousId = previous != null ? previous._id : null;

        if(selectedId != previousId)
            this.onSelectionChange(selected, previous);
    }
    getMoney(value, config)
    {
        value = !isNaN(value = parseFloat(value)) ? value : 0;

        value = value.toLocaleString('en-US', {style: 'currency', currency: config.currency, minimumFractionDigits: config.decimals, mmaximumFractionDigits: config.decimals});

        return value;
    }
    getHeader(column, row, index, content, width)
    {
        let key = "th-" + row + "-" + index;
        let colSpan = column.items ? column.items.length: column.colSpan;
        let align = column.align;

        return <TableColumnHeader   key={key}
                                    index={index}
                                    align={align}
                                    colSpan={colSpan}
                                    sort={column.dataIndex == this.state.sortField && column.dataIndex != null ? this.state.sortOrder : null}
                                    onClick={this.onHeaderClick}>{content}</TableColumnHeader>;
    }
    getColumnConfig(index)
    {
        return this.props.columns[index];
    }
    getRecord(index)
    {
        // TODO: Add validations
        return index >= 0 ? this.props.records[index] : null;
    }
    getRecords(columns, width)
    {
        let self = this;
        return this.sortData().map(function(record, rowIndex){
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
                    //width: column.width,
                    //minWidth: column.minWidth,
                    //maxWidth: column.maxWidth
                });


                return (<td key={"cell-" + rowIndex + "-" + columnIndex} className={"grid-cell-body " + align} colSpan={column.colSpan} style={style}><div className="text">{typeof data == 'boolean' ? data.toString() : data}</div></td>);
            });

            return (<tr id={"tr-" + record.id} data-index={rowIndex} key={"tr-" + rowIndex} data-id={record.id} onClick={self.onRowClick} onDoubleClick={self.onDoubleClick} className={record.className}>{cells}</tr>);
        });
    }
    sortData()
    {
        let sortOrder = this.state.sortOrder;
        let dataIndex = this.state.sortField;

        if(sortOrder != null && dataIndex != null)
        {
            let order = sortOrder == 'ASC' ? 1 : -1;

            return this.state.records.sort(function(a, b){
                a = a[dataIndex];
                b = b[dataIndex];

                return (a === b ? 0 : a > b ? 1 : -1) * order;
            });
        }
        else
            return this.state.records;
    }
    getSelectedRecord()
    {
        let dom = ReactDOM.findDOMNode(this);
        let body = dom.querySelector(".grid-bd-wrapper");
        let row = body.querySelector("tr.x-selected");

        if(row != null)
            return this.getRecord(this.getRowIndex(row));
        else
            return null;
    }
    render()
    {
        let columns = this.props.columns;
        let width = ((100/columns.length).toFixed(2) + "%");
        let rows = [{headers: []}];
        let self = this;
        let date = new Date();

        columns.forEach(function(column, index){
                if(self != null)
                {
                    rows[0].headers.push(self.getHeader(column, 0, index, column.header, width));

                    if(column.items != null)
                    {
                        if(rows.length == 1)
                            rows.push({headers: []});

                        let width2 = ((100 / column.items.length).toFixed(2) + "%");

                        column.items.forEach(function(column2, index2){
                            rows[1].headers.push(self.getHeader(column2, index, index2, column2.header, width2));
                        });
                    }
                }
        });

        let headers = rows.map(function(row, index){
            let headers = row.headers.map(function(header){
                return header;
            });

            return <tr key={"row-header-" + index}>{headers}</tr>;
        });

		var records = this.props.rows || this.getRecords(columns, width);

        let classes = ['grid-panel', this.props.mode];

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.loading)
            classes.push('mask');

        return (
            <VerticalLayout id={this.props.id} className={classes.join(' ')} style={this.props.style}>
                {this.props.toolbar}
                <div className="grid-hd-wrapper" style={{flex: '0 0 auto'}}>
                    <table className="grid-header">
                        <thead>
                            {headers}
                        </thead>
                    </table>
                </div>
                <div className="grid-bd-wrapper" style={{flex: '1 auto'}}>
                    <table className="grid-body">
                        <tbody>
                            {records}
                        </tbody>
                    </table>
                </div>
            </VerticalLayout>
        );
    }
}

class TableColumnHeader extends Component
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

class Sort
{
    constructor(field, order)
    {
        this.field = field;
        this.order = order || 'ASC';
    }
    toggle()
    {
        this.order = this.order == 'ASC' ? 'DESC' : 'ASC';

        // Return the instance because what one can expect it's the object with the field and order properties
        return this;
    }
}
