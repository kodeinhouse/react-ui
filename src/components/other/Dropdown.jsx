import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Dropdown extends Component
{
	static get defaultProps() {
		return {
			align: 'center'
		};
	}

	constructor(props)
	{
		super(props);

		this.state = {
			open: false
		};

		this.onBlur = this.onBlur.bind(this);
		this.onTriggerClick = this.onTriggerClick.bind(this);
	}

	onBlur(event)
	{
		this.onHide();
	}

	onHide()
	{
		this.setState({open: false});
	}

	onItemClick(item, event)
	{
		// If we don't preventDefault other elements wont take the focus
		// When testing it from the Breakdown view when I clicked an item in the New button the placeholder were being created and removed immediately
		event.preventDefault();

		this.onHide();

		if(this.props.onChange)
			this.props.onChange(this, item);
	}

	onTriggerClick(event)
	{
		this.setState({open: !this.state.open});

		if(this.props.onClick)
			this.props.onClick(event);

		event.stopPropagation();
	}

	onCreateItem(item)
	{
		// This is used when we want to add group of items
		if((item.items || []).length > 0)
		{
			let result = item.items.map(this.onCreateItem.bind(this))

			return (<div key={item.id}>
						<div className="item-header">{item.text}</div>
						<div>{result}</div>
					</div>);
		}
		else
		{
			let content = this.props.onCreateItem ? this.props.onCreateItem(item) : item.text;
			let classes = ['item'];

			if(item.cls != null)
				classes.push(item.cls);

			return (<div key={item.id} className={classes.join(' ')} onMouseDown={this.onItemClick.bind(this, item)}>{content}</div>);
		}
	}

	renderPopover()
	{
		let self = this;
		let classes = ['popover', this.props.align].join(' ');
		let items = this.props.items.map(this.onCreateItem.bind(self));
		let dimension = this.child.getBoundingClientRect();

		let {top, left, width, height} = dimension;

		if(this.props.align == 'left')
			left = left;
		else
			if(this.props.align == 'center')
				left = left + (width / 2);
			else
				if(this.props.align == 'right')
					left = left + width;
		if(items.length == 0)
			items = <div style={{padding: '0px 10px'}}>No results found</div>;

		return (<div className={classes} style={{top: top + height + 2, left: left}} onMouseLeave={this.onMouseLeave}>{items}</div>);
	}

	render()
	{
		var classes = ['dropdown', this.props.className].join(' ');

		return (<div id={this.props.id} ref={c => {this.child = c;}} className={classes} style={this.props.style}>
					<a href="javascript:void(0);" className="dropdown-trigger" onClick={this.onTriggerClick} onBlur={this.onBlur}>
						{this.props.children}
					</a>
					{ this.state.open ? this.renderPopover() :  null}
				</div>);
	}
}
