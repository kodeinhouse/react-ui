import React, { Component } from 'react';
import { FrappeGantt, Task, ViewMode } from 'frappe-gantt-react';
import { Bar as BarChart, Timeline as TimelineChart } from 'chart';

export class ChartDemo extends Component {
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

    render(){
        return  <TimelineChart region="center" tasks={this.getTasks()} />;
    }
}

export class FrappeGanttDemo extends Component{
    constructor(props) {
       super(props);

       this.state = {mode: ViewMode.HalfDay};

       setTimeout(() => {
           console.log("Setting State!");
           this.setState({mode: ViewMode.Month});
       }, 10000);
    }

    render(){
        const tasks = [
        {
            id: 'Task 1',
            name: 'Redesign website',
            start: '2016-12-28',
            end: '2016-12-31',
            progress: 10,
            dependencies: ''
        },
        {
            id: 'Task 2',
            name: 'Redesign website',
            start: '2016-12-28',
            end: '2016-12-31',
            progress: 20,
            dependencies: 'Task 1'
        },
        {
            id: 'Task 3',
            name: 'Redesign website',
            start: '2016-12-28',
            end: '2016-12-31',
            progress: 0,
            dependencies: 'Task 2, Task 1'
        }];

        return <FrappeGantt tasks={tasks} viewMode={this.state.mode}/>;
    }
}