import React, { Component } from 'react';
import { CheckBox } from './CheckBox';
import { CheckGroup } from './CheckGroup';
import { Dropdown } from './Dropdown';
import { FieldGroup } from './FieldGroup';
import { Fieldset } from './Fieldset';
import { FormField } from './FormField';
import { Label } from './Label';
import { Legend } from './Legend';
import { DateField } from './DateField';
import { NumberField } from './NumberField';
import { RadioButton } from './RadioButton';
import { RadioGroup } from './RadioGroup';
import { SearchField } from './SearchField';
import { SpinnerField } from './SpinnerField';
import { TextArea } from './TextArea';
import { TextField } from './TextField';
import { CompositeField } from './CompositeField';
import { DisplayField } from './DisplayField';
import { AutoTextArea } from './AutoTextArea';

export class Form extends Component
{
    render()
    {
        let classes = ['form'];

        if(this.props.className)
            classes.push(this.props.className);

        return (
            <form className={classes.join(' ')}>
                {this.props.children}
            </form>
        );
    }
}

Form.AutoTextArea = AutoTextArea;
Form.CheckBox = CheckBox;
Form.CheckGroup = CheckGroup;
Form.Dropdown = Dropdown;
Form.FieldGroup = FieldGroup;
Form.Fieldset = Fieldset;
Form.FormField = FormField;
Form.Label = Label;
Form.Legend = Legend;
Form.DateField = DateField;
Form.NumberField = NumberField;
Form.RadioButton = RadioButton;
Form.RadioGroup = RadioGroup;
Form.SearchField = SearchField;
Form.SpinnerField = SpinnerField;
Form.TextArea = TextArea;
Form.TextField = TextField;
Form.CompositeField = CompositeField;
Form.DisplayField = DisplayField;
