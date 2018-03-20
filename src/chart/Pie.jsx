import React, { Component } from 'react';
import { Chart } from './Chart';

export class Pie extends Component{
    render(){
        let { size, progress, style } = this.props;

        //stroke-dasharray: 60 158; /* 2π × 25 ≈ 158 */
        let center = size / 2;
        let radius = size / 2;

        let circumference = Math.round(Math.PI * 2 * radius);
        let fill = (progress * circumference) / 100;

        return (
            <Chart className="pie" width={size} height={size} style={style}>
                <circle r={radius.toString()} cx={center.toString()} cy={center.toString()} strokeWidth={size.toString()} strokeDasharray={`${fill} ${circumference}`} />
            </Chart>
        );
    }
}
