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

        this.onScroll = this.onScroll.bind(this);
    }

    onScroll(event){
        let node = ReactDOM.findDOMNode(this);
        let slots = node.querySelector(".chart-slots");
        let dates = node.querySelector(".chart-dates");
        let items = node.querySelector(".chart-items");

        dates.scrollLeft = slots.scrollLeft;
        items.scrollTop = slots.scrollTop;
    }

    resizeSVG(){
        let container = ReactDOM.findDOMNode(this).querySelector(".chart-slots");
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

        let node = ReactDOM.findDOMNode(this);
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

    renderLanes(tasks){
        let minDate = this.getMinDate(tasks);
        let maxDate = this.getMaxDate(tasks);

        let dates = this.getUnits(minDate, maxDate);

        let columnHeight = isNaN(this.state.height - 20) ? 0 : (this.state.height - 20);
        let paddingLeft = 15;

        return (
            <g transform={`translate(${paddingLeft}, 0)`}>
                {dates.map((c, index) => {
                    let x = 50 * index;

                    return (
                        <g key={`g-${index}`} transform={`translate(${x}, 0)`}>
                            <line y1="10" y2={columnHeight} x1="20" x2="20" stroke="lightgrey" shapeRendering="crispEdges"></line>
                        </g>
                    );
                })}
            </g>
        );
    }

    renderDates(tasks){
        let minDate = this.getMinDate(tasks);
        let maxDate = this.getMaxDate(tasks);

        let dates = this.getUnits(minDate, maxDate);

        let columnHeight = isNaN(this.state.height - 20) ? 0 : (this.state.height - 20);
        let paddingLeft = 15;

        return (
            <g transform={`translate(${paddingLeft}, 20)`}>
                {dates.map((c, index) => {
                    let x = 50 * index;

                    return (
                        <g key={`g-${index}`} transform={`translate(${x}, 0)`}>
                            <text>{c.toLocaleDateString('en-US', {month: 'short', day: '2-digit'})}</text>
                        </g>
                    );
                })}
            </g>
        );
    }

    renderTasks(tasks){
        let colors = ["#03a9f4", "#ff9800", "#00bcd4", "#66bb6a", "#ff7043", "#ba68c8", "#9575cd", "#7986cb", "#ef5350", "#66bb6a"];

        let rectHeight = '25px';
        let gap = '5px';

        return tasks.map((c, index) => {
            let style = {height: rectHeight, marginBottom: gap, marginTop: (index > 0 ? gap: '0px'), display: 'flex'};
            return (
                <div key={"cat-" + index} style={style}>
                    <span style={{margin: 'auto 0px', flex: 1}}>{c.text}</span>
                    <PieChart size={20} progress={c.progress} style={{margin: 'auto 0px auto 20px'}}/>
                </div>
            );
        });
    }

    renderSlots(tasks){
        let colors = ["#03a9f4", "#ff9800", "#00bcd4", "#66bb6a", "#ff7043", "#ba68c8", "#9575cd", "#7986cb", "#ef5350", "#66bb6a"];
        let minDate = this.getMinDate(tasks);

        let columnWidth = 50;
        let rectHeight = 25;
        let gap = 5;
        let paddingLeft = 15;

        return (
            <g transform="translate(0, 10)">
                {tasks.map((c, index) => {
                    let rectX = paddingLeft + (columnWidth * this.getUnitDiff(minDate, c.startDate));
                    let rectY = ((rectHeight + gap) * index);

                    let rectWidth = columnWidth * (this.getUnitDiff(c.startDate, c.endDate) + 1);
                    let textY = 18 + rectY;

                    if(!isNaN(rectX) && !isNaN(rectWidth))
                    {
                        return (
                            <g key={`task-${index}`}>
                                <rect x={rectX} y={rectY} rx="10" ry="10" width={rectWidth} height={rectHeight} fill={colors[index]}></rect>
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
            <Container className="timeline" region={this.props.region} layout="border" overflow={false}>
                <Container className="chart-items" padding="10px 10px 0px 10px" scrollableY style={{maxWidth: '200px', marginTop: '30px'}}>
                    {tasks.length > 0 && this.renderTasks(tasks)}
                    {this.renderField()}
                </Container>
                <Container region="center" layout="border" overflow={false} orientation="vertical">
                    <Container className="chart-dates" layout="border" scrollable style={{backgroundColor: ''}}>
                        <svg style={{minWidth: this.state.width}} height="30px">
                            {tasks.length > 0 && this.renderDates(tasks)}
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
