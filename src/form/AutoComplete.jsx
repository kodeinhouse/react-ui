import React, { Component } from 'react';
import { Field } from './Field';
import { TextField as BaseField } from './base/TextField';
import { Dropdown } from '../components/other/Dropdown';
import { Tag } from '../components/other/Tag';
import PropTypes from 'prop-types';

export class MultiSelect extends Field
{
    constructor(props){
        super(props);

        this.onItemClick = this.onItemClick.bind(this);
        this.onCreateItem = this.onCreateItem.bind(this);
    }

    onCreateItem(item){
        let selection = this.pick(this.props.value, this.state.value) || [];

        return selection.indexOf(item.id) != -1 ? <strong>{item.text}</strong> : item.text;
    }

    onItemClick(dropdown, item){
        let items = this.pick(this.props.value, this.state.value) || [];
        let index = items.indexOf(item.id);

        // Toggle the item
        if(index == -1)
            items.push(item.id);
        else
            items.splice(index, 1);

        this.onChange(this.props, items);
    }

    getSelectedTags(values){
        let items = {};
        let tags = this.props.items || [];

        tags.forEach(c => { items[c.id] = c;});

        return values.map(c => { return items[c]});
    }

    renderTags(tags){
        return tags.map(c => {return <CustomTag key={`tag-${c.id}`} onRemove={e => this.onItemClick(this.props, c)} {...c} />});
    }

    createField(){
        let style = {
            border: '1px solid #E3E3E3',
            padding: '6px 5px',
            borderRadius: '3px',
            minHeight: '31px'
        };

        let values = this.pick(this.props.value, this.state.value) || [];

        return (
            <Dropdown onChange={this.onItemClick} items={this.props.items} onCreateItem={this.onCreateItem} style={style} closeOnClick={false}>
                <div style={{minHeight: '15px'}}>{values.length > 0 ? this.renderTags(this.getSelectedTags(values)) : <div style={{color: 'gray'}}>Please select an item</div>}</div>
            </Dropdown>
        );
    }
}

MultiSelect.propTypes = {
    items: PropTypes.array
};

class CustomTag extends Component{
    constructor(props){
        super(props);

        this.onRemove = this.onRemove.bind(this);
    }

    onRemove(event){
        if(this.props.onRemove)
            this.props.onRemove(null, this.props);

        event.stopPropagation();
    }

    render(){
        let style = {padding: '0px 4px', fontStyle: 'normal', fontFamily: 'sans-serif', color: 'gray'};

        return <Tag className="default" >{this.props.text} <i onClick={this.onRemove} style={style}>x</i></Tag>
    }
}

export class AutoComplete extends Field
{
    constructor(props){
        super(props);

        this.state = {
            open: false,
            filter: '',
            visible: false,
            items: props.items || []
        };

        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        super.componentWillReceiveProps(nextProps);

        this.setState({items: nextProps.items});
    }

    onBlur(event){
        //this.onHide();
    }

    onAdd(item) {
        const { props } = this;
        const { onAdd } = props;

        let values = this.pick(this.props.value, this.state.value) || [];
        let index = values.indexOf(item.id);
        let items = this.state.items;

        // Remove the new item
        if(item.id == 'none')
        {
            let index = items.map(c => { return c.id}).indexOf(item.id);

            items[index].id = item.text.toLowerCase();

            values.push(items[index].id);
        }
        else
            values.push(item.id);

        this.setState({open: false, filter: '', items: items, values: values});

        onAdd && onAdd(item);

        this.onChange(this.props, values);
    }

    onRemove(item){
        const { props } = this;
        const { onRemove } = props;

        let values = this.pick(this.props.value, this.state.value) || [];
        let index = values.indexOf(item.id);

        // Toggle the item
        values.splice(index, 1);

        this.setState({values: values});

        onRemove && onRemove(item);

        this.onChange(this.props, values);
    }

    onTextChange(field, value){
        const { state } = this;
        const { items } = state;

        value = value.trim();

        // Filter out what has been already added

        let result = items.filter(c => c.text.toLowerCase().indexOf(value.toLowerCase()) != -1);

        if(result.length == 0 && value != '')
        {
            // Check now if there is already a new item added
            let index = items.map(c => { return c.id}).indexOf('none');

            // If the none item is not found push the new tag otherwise update it
            if(index == -1)
                items.push({id: 'none', text: value});
            else
                items[index].text = value;
        }
        else
            if(value == ''){
                // Check now if there is already a new item added
                let index = items.map(c => { return c.id}).indexOf('none');

                if(index != -1)
                    items.splice(index, 1);
            }

        this.setState(state => {
            return {
                open: (result.length > 0 || value != ''),
                items: items,
                filter: value
            };
        });
    }

    onHide(){
        //this.setState({open: false});
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

            //onMouseDown={this.onAdd(item)}
            return (<div key={item.id} className={classes.join(' ')} onClick={event => this.onAdd(item)}>{content}</div>);
        }
    }

    getFilteredItems(items){
        return items.filter(c => c.text.toLowerCase().indexOf(this.state.filter.toLowerCase()) != -1);
    }

    renderPopover()
	{
		let self = this;
		let classes = ['popover', this.props.align].join(' ');
		let items = this.getFilteredItems(this.state.items);
		let dimension = this.child.getBoundingClientRect();

		let {top, left, width, height} = dimension;

		if(items.length == 0)
			items = <div style={{padding: '0px 10px'}}>No results found</div>;

		return (<div className={classes} style={{left: left, top: top + height + 2, width: width, position: 'fixed'}} onMouseLeave={this.onMouseLeave}>{items.map(this.onCreateItem.bind(self))}</div>);
	}

    getSelectedTags(values){
        let tags = {};

        // Map values based on the id
        (this.state.items || []).forEach(c => { tags[c.id] = c;});

        return values.map(c => { return tags[c]}).filter(c => c != null);
    }

    renderTags(tags){
        if(tags.length > 0){
            let items = tags.map(c => {return <CustomTag key={`tag-${c.id}`} onRemove={e => this.onRemove(c)} {...c} />});

            return items;
        }
        else
            return null;
    }

    createField(){
        let values = this.pick(this.props.value, this.state.value) || [];

        return (
            <div className="autocomplete" ref={(c) => {this.child = c;}} onClick={event => {event.stopPropagation(); event.preventDefault();}}>
                {this.renderTags(this.getSelectedTags(values))}
                <BaseField ref={(c) => {this.field = c;}} value={this.state.filter} onChange={this.onTextChange} placeholder={this.props.placeholder} onBlur={this.onBlur}/>
                { this.state.open ? this.renderPopover() :  null}
            </div>
        );
    }
}
