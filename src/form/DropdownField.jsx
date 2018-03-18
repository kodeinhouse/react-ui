import React, { Component } from 'react';
import { Field } from './Field';
import { Label } from './Label';
import { FormField } from './FormField';
import { Dropdown } from '../components/other/Dropdown';

export class DropdownField extends Field {
    createField(){
        let value = this.pick(this.props.value, this.state.value);
        let items = this.props.items.filter(c => c.id == value);

        return (
            <Dropdown position="absolute" className="wrapper" items={this.props.items} style={{border: '1px solid #E3E3E3', borderRadius: '3px'}} onChange={(field, item) => {this.onChange(field, item.id)}}>
                <div style={{padding: '6px 5px', minHeight: '30px'}}>{items.length > 0 ? items[0].text : null}</div>
            </Dropdown>
        );
    }
}
