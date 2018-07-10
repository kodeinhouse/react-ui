import React, { Component } from 'react';
import { Form } from './Form';
import { Container } from '../container/Container';
import ReactDOM from 'react-dom';

export class InlineEditor extends Component{
    constructor(props){
        super(props);

        this.state = {
            adding: false
        };

        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onTextEnter = this.onTextEnter.bind(this);
    }

    onBlur(field){
        console.log('onBlur');
        this.setState({adding: false});
    }

    onClick(){
        let self = this;

        if(this.input != null)
            this.input.focus();

        this.setState({adding: true}, function(){

        });
    }

    onKeyPress(event)
	{
        if(this.props.onKeyPress)
            this.props.onKeyPress(event);

		if(event.key == 'Enter')
        	this.onTextEnter(event);
	}

    onTextEnter(event){
        if(this.props.onTextEnter)
        {
            this.props.onTextEnter(event);
            this.setState({adding: false});
        }
    }

    render(){
        let children = null;

        if(this.state.adding)
            children = <Form.TextField inputRef={(input) => {this.input = input}} placeholder={this.props.placeholder} onBlur={this.onBlur} onKeyPress={this.onKeyPress} autoFocus/>;
        else
        {
            let text = this.props.text || this.props.placeholder || "New item";

            children = <a onClick={this.onClick} style={{color: 'gray', cursor: 'pointer'}}>{text}</a>;
        }


        return (
            <Container style={this.props.style}>
                {children}
            </Container>
        );
    }
}
