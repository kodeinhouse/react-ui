import React, { Component } from 'react';
import { Field } from './Field';
import { Dropdown } from '../components/other/Dropdown';
import { Tag } from '../components/other/Tag';

export class MultiSelect extends Field
{
    constructor(props){
        super(props);

        this.onItemClick = this.onItemClick.bind(this);
        this.onCreateItem = this.onCreateItem.bind(this);
    }

    onCreateItem(item){
        let selection = this.state.value || [];

        return selection.indexOf(item.id) != -1 ? <strong>{item.text}</strong> : item.text;
    }

    onItemClick(dropdown, item){
        let items = this.state.value || [];
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

        this.props.items.forEach(c => { items[c.id] = c;});

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

        let values = this.state.value || [];

        return (
            <Dropdown onChange={this.onItemClick} items={this.props.items} onCreateItem={this.onCreateItem} style={style} closeOnClick={false}>
                <div style={{minHeight: '15px'}}>{this.renderTags(this.getSelectedTags(values))}</div>
            </Dropdown>
        );
    }
}

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
