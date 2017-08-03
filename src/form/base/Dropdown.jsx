import React, { Component } from 'react';

export class Dropdown extends Component
{
    render()
    {
        let options = this.props.options || [];

        return (
            <select>
                {options.map(function(option, index){
                    return <option key={"dd-" + index}>{option.text}</option>;
                })}
            </select>
        );
    }
}
