import React, { Component } from 'react';
import { Chart } from './Chart';
import { Pie as PieChart } from './Pie';
import { Container } from '../container/Container';
import { Form } from '../form/Form';
import ReactDOM from 'react-dom';

const ViewMode = {
    MONTH: 'MONTH',
    DAY: 'DAY'
};

export class Timeline extends Component {
    constructor(props){
        super(props);

        this.state = {
            width: props.width,
            height: props.height
        };

        this.onItemRender = this.onItemRender.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    static get defaultProps(){
        return {
            itemsWidth: '200px',
            slotHeight: 26,
            rowHeight: 40
        };
    }

    onScroll(event){
        let node = this.container;
        let slots = node.querySelector(".chart-slots");
        let dates = node.querySelector(".chart-dates");
        let items = node.querySelector(".chart-items");

        dates.scrollLeft = slots.scrollLeft;
        items.scrollTop = slots.scrollTop;
    }

    resizeSVG(){
        let container = this.container.querySelector(".chart-slots");
        let chart = container.querySelector("svg:last-child");

        let chartSize = chart.getBBox();
        let containerSize = container.getBoundingClientRect();

        if(chartSize.width > 0 && chartSize.height > 0)
        {
            let width = Math.floor(containerSize.width) > Math.floor(chartSize.width) ? Math.floor(containerSize.width) : Math.floor(chartSize.width);
            let height = Math.floor(containerSize.height) > Math.floor(chartSize.height) ? Math.floor(containerSize.height) : Math.floor(chartSize.height);

            if((this.state.width  || 0) < width || (this.state.height || 0) < height)
                this.setState({width: width, height: height});
        }
    }

    componentDidMount(){
        this.resizeSVG();

        let node = this.container;
        let slots = node.querySelector(".chart-slots");

        slots.addEventListener('scroll', this.onScroll);
    }

    componentDidUpdate(){
        this.resizeSVG()
    }

    getTasks(){
        return this.props.tasks;
    }

    getUTCDate(date)
	{
		return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
	}

    getMinDate(tasks)
	{
		let date = null;

		tasks.forEach(function(record){
			if(record.startDate != null && date != null && record.startDate.getTime() < date.getTime())
				date = record.startDate;
			else
				if(date == null && record.startDate != null)
					date = record.startDate;
		});

		return date != null ? this.getUTCDate(date) : null;
	}

	getMaxDate(tasks)
	{
		let date = null;

		tasks.forEach(function(record){
			if(record.endDate != null && date != null && record.endDate.getTime() > date.getTime())
				date = record.endDate;
			else
				if(date == null && record.endDate != null)
					date = record.endDate;
		});

		return date != null ? this.getUTCDate(date) : null;
	}

    getDateDiff(startDate, endDate)
	{
		let diff = 0;

		if(startDate != null && endDate != null)
		{
			let firstDate = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
			let secondDate = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

			diff = Math.abs((firstDate.valueOf() - secondDate.valueOf())/(24 * 60 * 60 * 1000));
		}

		return diff;
	}

    getMonthDiff(minDate, maxDate){
        if(minDate != null && maxDate != null)
            return (maxDate.getFullYear() - minDate.getFullYear()) * 12 + (maxDate.getMonth() - minDate.getMonth());
        else
            return null;
    }

    getUnitDiff(minDate, maxDate){
        if(this.props.viewMode == ViewMode.DAY)
            return this.getDateDiff(minDate, maxDate);
        else
            if(minDate != null && maxDate != null)
                return this.getMonthDiff(new Date(minDate.getFullYear(), minDate.getMonth(), 1), maxDate);
    }

    getDates(minDate, maxDate){
        let dates = [];

        if(minDate != null && maxDate != null){
            let dateCount = this.getDateDiff(minDate, maxDate) + 1;
            let auxDate = new Date(minDate.getTime());


            for (let i = 0; i < dateCount; i++) {
                dates.push(new Date(auxDate.getFullYear(), auxDate.getMonth(), auxDate.getDate()));

                auxDate.setDate(auxDate.getDate() + 1);
            }
        }

        return dates;
    }

    getMonths(minDate, maxDate){
        let dateCount = this.getMonthDiff(minDate, maxDate) + 1;
        let auxDate = new Date(minDate.getTime());
        let dates = [];

        for (let i = 0; i < dateCount; i++) {
            dates.push(new Date(auxDate.getFullYear(), auxDate.getMonth(), auxDate.getDate()));

            auxDate.setMonth(auxDate.getMonth() + 1);
        }

        return dates;
    }

    getUnits(minDate, maxDate){
        if(this.props.viewMode == ViewMode.DAY)
            return this.getDates(minDate, maxDate);
        else
            return this.getMonths(new Date(minDate.getFullYear(), minDate.getMonth(), 1), new Date(maxDate.getFullYear(), maxDate.getMonth(), 1));
    }

    getColumnWidth(){
        if(this.props.viewMode == ViewMode.MONTH)
            return 50;
        else
            return 30;
    }

    renderLanes(tasks){
        let minDate = this.getMinDate(tasks);
        let maxDate = this.getMaxDate(tasks);

        let dates = this.getUnits(minDate, maxDate);

        let columnHeight = isNaN(this.state.height - 20) ? 0 : (this.state.height - 20);
        let paddingLeft = 0;
        let slotWidth = this.getColumnWidth();

        return (
            <g transform={`translate(${paddingLeft}, 0)`}>
                {dates.map((c, index) => {
                    let x = slotWidth * index;

                    return (
                        <g key={`g-${index}`} transform={`translate(${x}, 0)`}>
                            <line y1="10" y2={columnHeight} x1="20" x2="20" stroke="lightgrey" shapeRendering="crispEdges"></line>
                        </g>
                    );
                })}
            </g>
        );
    }

    getHeaderFormat(){
        if(this.props.viewMode == ViewMode.MONTH)
            return {month: 'short', day: '2-digit'};
        else
            return {day: '2-digit'};
    }

    renderDates(tasks){
        let minDate = this.getMinDate(tasks);
        let maxDate = this.getMaxDate(tasks);

        let dates = this.getUnits(minDate, maxDate);

        let columnHeight = isNaN(this.state.height - 20) ? 0 : (this.state.height - 20);
        let paddingLeft = 15;
        let slotWidth = this.getColumnWidth();
        let headerFormat = this.getHeaderFormat();
        let fontSize = (this.props.viewMode == ViewMode.MONTH ? 'inherit' : '12px');
        return (
            <g transform={`translate(${paddingLeft}, 25)`}>
                {dates.map((c, index) => {
                    let x = slotWidth * index;

                    return (
                        <g key={`g-${index}`} transform={`translate(${x}, 0)`}>
                            <text fontSize={fontSize}>{c.toLocaleDateString('en-US', headerFormat)}</text>
                        </g>
                    );
                })}
            </g>
        );
    }

    renderMonths(tasks){
        if(this.props.viewMode != ViewMode.DAY)
            return;

        let minDate = this.getMinDate(tasks);
        let maxDate = this.getMaxDate(tasks);

        let dates = this.getUnits(minDate, maxDate);

        let columnHeight = isNaN(this.state.height - 20) ? 0 : (this.state.height - 20);
        let paddingLeft = 15;
        let slotWidth = this.getColumnWidth();
        let headerFormat = this.getHeaderFormat();

        let months = {};

        dates.forEach(function(date){
            let name = date.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});

            months[name] = (months[name] || 0) + 1;
        });

        let x = 0;
        let count = 0;

        return (
            <g transform={`translate(${paddingLeft}, 10)`}>
                {Object.keys(months).map((c, index) => {
                    x = slotWidth * (count + (months[c] / 2));

                    count += months[c];

                    return (
                        <g key={`g-${index}`} transform={`translate(${x}, 0)`}>
                            <text fontSize="12px">{c}</text>
                        </g>
                    );
                })}
            </g>
        );
    }

    onItemRender(item){
        return (
            <div style={{display: 'flex'}}>
                <span style={{margin: 'auto 0px', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', fontSize: '12px'}} title={item.text}>{item.text}</span>
                <PieChart size={20} progress={item.progress} style={{margin: 'auto 0px auto 20px'}}/>
            </div>
        );
    }

    renderTasks(tasks){
        let colors = ["#03a9f4", "#ff9800", "#00bcd4", "#66bb6a", "#ff7043", "#ba68c8", "#9575cd", "#7986cb", "#ef5350", "#66bb6a"];

        let renderItem = this.props.onItemRender || this.onItemRender;

        return tasks.map((c, index) => {
            let style = {};

            return (
                <div key={"cat-" + index} style={style}>
                    {renderItem(c)}
                </div>
            );
        });
    }

    renderSlots(tasks){
        let colors = ["#03a9f4", "#ff9800", "#00bcd4", "#66bb6a", "#ff7043", "#ba68c8", "#9575cd", "#7986cb", "#ef5350", "#66bb6a"];
        let minDate = this.getMinDate(tasks);
        let columnWidth = this.getColumnWidth();
        let slotHeight = this.props.slotHeight;
        let rowHeight = this.props.rowHeight
        let gap = (rowHeight - slotHeight) / 2;
        let paddingLeft = 5;
        let colorIndex = 0;

        return (
            <g transform="translate(0, 10)">
                {tasks.map((c, index) => {
                    let rectX = paddingLeft + (columnWidth * this.getUnitDiff(minDate, c.startDate));
                    let rectY = (rowHeight * index) + gap;

                    let slotWidth = columnWidth * (this.getUnitDiff(c.startDate, c.endDate) + 1);

                    if(colorIndex == colors.length)
                        colorIndex = 0;

                    if(!isNaN(rectX) && !isNaN(slotWidth))
                    {
                        return (
                            <g key={`task-${index}`}>
                                <rect x={rectX} y={rectY} rx="10" ry="10" width={slotWidth} height={slotHeight} fill={colors[colorIndex++]}></rect>
                            </g>
                        );
                    }
                    else
                        return null;
                })}
            </g>
        );
    }

    renderField(){
        return (
            <Form.InlineEditor onTextEnter={this.props.onTextEnter} />
        );
    }

    render(){
        let tasks = this.getTasks();

        return (
            <Container myRef={(c) => {this.container = c; }} className="timeline" region={this.props.region} layout="border" overflow={false}>
                <Container className="chart-items" padding="10px 10px 0px 10px" scrollableY style={{maxWidth: this.props.itemsWidth, marginTop: '30px', border: '1px solid transparent'}}>
                    {tasks.length > 0 && this.renderTasks(tasks)}
                    {this.renderField()}
                </Container>
                <Container region="center" layout="border" overflow={false} orientation="vertical">
                    <Container className="chart-dates" layout="border" scrollable style={{backgroundColor: ''}}>
                        <svg style={{minWidth: this.state.width}} height="30px">
                            {tasks.length > 0 && this.renderDates(tasks)}
                            {tasks.length > 0 && this.renderMonths(tasks)}
                        </svg>
                    </Container>
                    <Container className="chart-slots" region="center" scrollable style={{backgroundColor: 'white', borderLeft: '1px solid lightgray', borderTop: '1px solid lightgray'}}>
                        <Chart width={this.state.width} height={this.state.height} viewBox={this.props.viewBox} preserveAspectRatio={this.props.preserveAspectRatio}>
                            {tasks.length > 0 && this.renderLanes(tasks)}
                            {tasks.length > 0 && this.renderSlots(tasks)}
                        </Chart>
                    </Container>
                </Container>

            </Container>
        );
    }
}

Timeline.ViewMode = ViewMode;
