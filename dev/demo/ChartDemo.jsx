import React, { Component } from 'react';
import { FrappeGantt, Task, ViewMode } from 'frappe-gantt-react';
import { Bar as BarChart, Timeline as TimelineChart } from 'chart';

export class ChartDemo extends Component {
    render(){
        return  <div style={{overflow: 'auto', width: '100%'}}>
                    <TimelineChart width="4000px" height="100%"/>
                </div>;
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
