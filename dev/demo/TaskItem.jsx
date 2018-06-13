import React, { Component } from 'react';
import { Avatar } from 'components';
import { Pie as PieChart } from 'chart';

export class TaskItem extends Component {
    render(){
        let { text, progress, url } = this.props;

        return (
            <div style={{display: 'flex'}}>
                <Avatar src={url} width="20px" height="20px" style={{borderRadius: '10px', marginRight: '10px'}}/>
                <span style={{margin: 'auto 0px', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', fontSize: '12px'}} title={text}>{text}</span>
                <PieChart size={20} progress={progress} style={{margin: 'auto 0px auto 20px'}}/>
            </div>
        );
    }
}
