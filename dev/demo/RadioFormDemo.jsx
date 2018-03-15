import React, { Component } from 'react';
import {
    RadioGroup,
    RadioButton
} from 'form';

export class RadioFormDemo extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            who: 'second'
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(field, value)
    {
        this.setState({[field.props.name]: value});
    }

    render()
    {
        return (
            <div>
                <label>We are a group of radio buttons</label>
                <RadioGroup stacked name="who" value={this.state.who} onChange={this.onChange}>
                    <RadioButton label="I'm a radio button" value="first"/>
                    <RadioButton label="Me too" value="second"/>
                    <RadioButton label="I'm too" value="third"/>
                </RadioGroup>
            </div>
        );
    }
}
