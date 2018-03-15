import React, { Component } from 'react';
import { Chart } from './Chart';

export class Timeline extends Component {
    getTasks(){
        let tasks = [];
        let dates = [new Date(2018, 0, 28), new Date(2018, 1, 28), new Date(2018, 2, 28)];
        let startDate, endDate;

        for (let i = 0; i < 10; i++) {
            startDate = new Date(2018, 0, parseInt(((Math.random() * 100) * 30) / 100));
            endDate = new Date(startDate.getTime());

            endDate.setDate(endDate.getDate() + parseInt(((Math.random() * 100) * 30) / 100));

            tasks.push({text: `Task ${i}`, startDate: startDate,  endDate: endDate});
        }

        return tasks;
    }

    getDates(tasks){

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

    renderDates(tasks){
        let minDate = this.getMinDate(tasks);
        let maxDate = this.getMaxDate(tasks);
        let auxDate = new Date(minDate.getTime());
        let dateCount = this.getDateDiff(minDate, maxDate);

        let dates = [];

        for (let i = 0; i < dateCount; i++) {
            dates.push(new Date(auxDate.getFullYear(), auxDate.getMonth(), auxDate.getDate()));

            auxDate.setDate(auxDate.getDate() + 1);
        }

        return (
            <g transform="translate(75, 20)">
                {dates.map((c, index) => {
                    let x = 50 * index;

                    return (
                        <g key={`g-${index}`} transform={`translate(${x}, 0)`}>
                            <line y1="20" y2="300" x1="20" x2="20" stroke="lightgrey" shapeRendering="crispEdges"></line>
                            <text>{c.toLocaleDateString('en-US', {month: 'short', day: '2-digit'})}</text>
                        </g>
                    );
                })}
            </g>
        );
    }

    renderTasks(tasks){
        let colors = ["#03a9f4", "#ff9800", "#00bcd4", "#66bb6a", "#ff7043", "#ba68c8", "#9575cd", "#7986cb", "#ef5350", "#66bb6a"];
        let minDate = this.getMinDate(tasks);

        let columnWidth = 50;
        let rectHeight = 25;
        let gap = 5;
        let paddingLeft = 70;

        console.log(tasks);
        
        return (
            <g transform="translate(0, 40)">
                {tasks.map((c, index) => {
                    let rectX = paddingLeft + (columnWidth * this.getDateDiff(minDate, c.startDate));
                    let rectY = ((rectHeight + gap) * index);

                    let rectWidth = columnWidth * this.getDateDiff(c.startDate, c.endDate);
                    let textY = 18 + rectY;

                    return (
                        <g key={`task-${index}`}>
                            <rect x={rectX} y={rectY} rx="10" ry="10" width={rectWidth} height={rectHeight} fill={colors[index]}></rect>
                            <text y={textY}>{c.text}</text>
                        </g>
                    );
                })}
            </g>
        );
    }

    render(){
        let tasks = this.getTasks();

        return (
            <Chart width={this.props.width} height={this.props.height}>
                {this.renderDates(tasks)}
                {this.renderTasks(tasks)}
            </Chart>
        );
    }
}
