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

        this.setState({adding: true}, function(){
            let input = ReactDOM.findDOMNode(self.input).querySelector("input");

            if(input != null)
                input.focus();
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
            children = <Form.TextField ref={(input) => {this.input = input}} onBlur={this.onBlur} onKeyPress={this.onKeyPress} autoFocus/>;
        else
            children = <a onClick={this.onClick} style={{color: 'gray', cursor: 'pointer'}}>New item</a>;

        return (
            <Container style={{maxWidth: '140px'}}>
                {children}
            </Container>
        );
    }
}
