import React, { Component } from 'react';

export class AutoTextArea extends Component
{
    static get defaultProps()
    {
        return {
            multiline: true,
            padding: 4 // Two pixels top and two pixels bottom
        };
    }

    constructor(props)
    {
        super(props);

        this.state = {
            rows: 1,
            value: props.value
        };

        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentDidMount() {
        this.textarea.style.overflowY = 'hidden'
        this.textarea.style.height = this.textarea.scrollHeight+'px'
    }

    componentDidUpdate()
    {
        this.autoResize(null);
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            value: nextProps.value != null ? nextProps.value : '',
        });
    }

    onChange(event)
    {
        this.setState({value: event.target.value});

        if(this.props.onChange)
            this.props.onChange(event);
    }

    onKeyPress(event)
    {
        if(this.props.onKeyPress)
            this.props.onKeyPress(event);

        if((event.key == 'Enter' && this.props.multiline == false))
        {
            event.preventDefault();
            event.stopPropagation();

            this.onChanged(event);
        }
    }

    onBlur(event)
    {
        if(this.props.onBlur)
            this.props.onBlur(event);

        this.onChanged(event);
    }

    onChanged(event)
    {
        if(this.props.onChanged)
            this.props.onChanged(event);
    }

    getValue()
    {
        return this.state.value || this.props.value;
    }

    autoResize(e) {
        this.textarea.style.height = 'auto'
        this.textarea.style.height = this.textarea.scrollHeight+'px'
        this.props.onInput && this.props.onInput(e);
    }

    render()
    {
        return (<textarea id={this.props.id}
                          className={this.props.className}
                          ref={(c) => this.textarea = c}
                          value={this.state.value}
                          onInput={this.autoReize}
                          onChange={this.onChange}
                          onBlur={this.onBlur}
                          onKeyPress={this.onKeyPress}/>);
    }
}
