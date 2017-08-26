import React, { Component } from 'react';

export class ToggleButton extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			toggle: (props.active != null ? props.active : false),
			disabled: props.disabled
		};

		this.onClick = this.onClick.bind(this);
	}
	onClick(event)
	{
		this.state.toggle = !this.state.toggle;
		this.setState({toggle: this.state.toggle});

		if(this.props.onClick)
			this.props.onClick(event);
	}
	setDisabled(disabled)
	{
		this.setState({disabled: disabled});
	}
	isToggled()
	{
		return this.getState();
	}
	getState()
	{
		return this.state.toggle;
	}
	render()
	{
		let classes = ["toggle-button", this.state.toggle ? "active" : "normal"].join(" ");
		let iconClasses = [this.props.iconClass, this.state.toggle ? this.props.activeIcon : this.props.normalIcon].join(" ");

		return (<button id={this.props.id} onClick={this.onClick} className={classes} disabled={this.state.disabled}><i className={iconClasses}></i><span>{this.props.children}</span></button>);
	}
}
