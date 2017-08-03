import React, { Component } from 'react';
import { FormField } from './FormField';
import { SearchField as SearchInput } from './base/SearchField';

export class SearchField extends Component
{
    render()
    {
        let props = Object.assign({value: ''}, this.props);

        return (
            <FormField {...this.props}>
                <SearchInput {...props}/>
            </FormField>
        );
    }
}
