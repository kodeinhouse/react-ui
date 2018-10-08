import React, { Component } from 'react';
import { Container } from 'container';
import { DateHelper } from 'util';
import moment from 'moment';

export class Calendar extends Component {
    renderDays() {
        let date = DateHelper.getMonday(new Date());
        let days = [];

        for (let i = 0; i < 7; i++) {
            days.push(<Day key={`day-${i}`} date={new Date(date.getFullYear(), date.getMonth(), date.getDate() + i)} style={{flex: '1'}} />);
        }

        return days;
    }

    render() {
        return (
            <Container region="center" layout="flex" className="calendar">
                {this.renderDays()}
            </Container>
        );
    }
}

class Day extends Component {
    renderTimeSlots(date) {
        let start = 8;
        let end = 17;
        let slots = [];

        for (let i = 8; i <= 17; i++) {
            slots.push(<Timeslot key={`${date.getDate()}-${i}`} time={new Date(date.getFullYear(), date.getMonth(), date.getDate(), i, 0, 0)} />);
        }

        return slots;
    }

    render() {
        let { style, text, date } = this.props;
        let classes = ['day'];

        return (
            <Container className={classes.join(' ')} layout="border" orientation="vertical" style={style}>
                <Container className="header">{text}</Container>
                <Container region="center" className="content">
                    {this.renderTimeSlots(date)}
                </Container>
            </Container>
        );
    }
}

class Timeslot extends Component {
    render() {
        let { time } = this.props;
        let classes = ['timeslot'];

        return <div className={classes.join(' ')}><span>{time.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</span></div>
    }
}
