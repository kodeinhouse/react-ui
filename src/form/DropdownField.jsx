import React, { Component } from 'react';
import { Field } from './Field';
import { Label } from './Label';
import { FormField } from './FormField';
import { Dropdown } from '../components/other/Dropdown';

export class DropdownField extends Field {
    renderItem(item){
        if(item != null)
            return this.props.onCreateItem ? this.props.onCreateItem(item) : item.text;
        else
            return null;
    }
    createField(){
        let value = this.pick(this.props.value, this.state.value);
        let items = this.props.items.filter(c => c.id == value);

        return (
            <Dropdown onCreateItem={this.props.onCreateItem} position="absolute" className="wrapper" items={this.props.items} style={{border: '1px solid #E3E3E3', borderRadius: '3px'}} onChange={(field, item) => {this.onChange(field, item.id)}}>
                <div style={{padding: '6px 5px', minHeight: '30px'}}>{items.length > 0 ? this.renderItem(items[0]) : null}</div>
            </Dropdown>
        );
    }
}
