import React, { Component } from 'react';
import {
    Form,
    Label,
    Legend,
    TextField,
    CheckBox,
    CheckGroup,
    RadioGroup,
    NumberField,
    SearchField,
    RadioButton,
    Dropdown,
    TextArea,
    FieldGroup,
    Fieldset
} from 'form';

import {
    Menu,
    MenuItem
} from 'menu';

import { Container } from 'container';

export class FormDemo extends Component
{
    render()
    {
        return (
            <Form>
                <Container className="row">
                    <Container className="half">
                        <Legend>Stacked fields</Legend>
                        <FieldGroup className="stacked">
                            <TextField label="First Name" className=""/>
                            <TextField label="Last Name" className="" />
                            <NumberField label="Age" className=""/>
                        </FieldGroup>

                        <Legend>Inline fields with label on top</Legend>
                        <FieldGroup className="inline">
                            <TextField label="First Name" />
                            <TextField label="Last Name" />
                            <NumberField label="Age" />
                        </FieldGroup>

                        <Legend>Inline fields with label at the left</Legend>
                        <FieldGroup className="inline">
                            <TextField label="First Name" className="inline"/>
                            <TextField label="Last Name" className="inline"/>
                            <NumberField label="Age" className="inline"/>
                        </FieldGroup>

                        <Legend>Inline fields with label on top using the full width</Legend>
                        <FieldGroup className="inline equal">
                            <TextField label="First Name"/>
                            <TextField label="Last Name"/>
                            <NumberField label="Age"/>
                        </FieldGroup>

                        <Legend>Inline fields with label at the left using the full width</Legend>
                        <FieldGroup className="inline equal">
                            <TextField label="First Name" className="inline"/>
                            <TextField label="Last Name" className="inline"/>
                            <NumberField label="Age"  className="inline"/>
                        </FieldGroup>

                        <RadioGroup name="gender" className="inline">
                            <Label>Gender:</Label>
                            <RadioButton label="Male" />
                            <RadioButton label="Female" />
                        </RadioGroup>
                        <NumberField label="Salary" currency="USD"/>
                        <CheckGroup className="inline">
                            <Label>Assets:</Label>
                            <CheckBox label="Own House"/>
                            <CheckBox label="Own Car"/>
                        </CheckGroup>
                        <Dropdown label="Country" options={[{text: 'Nicaragua'}, {text: 'Canada'}, {text: 'Irlanda'}, {text: 'Noruega'}]}>
                            <Menu>
                                <MenuItem>Nicaragua</MenuItem>
                                <MenuItem>Canada</MenuItem>
                                <MenuItem>Irlanda</MenuItem>
                                <MenuItem>Noruega</MenuItem>
                            </Menu>
                        </Dropdown>
                        <TextArea label="Purpose"/>
                    </Container>
                    <Container className="half">
                        <Legend>Stacked Fields</Legend>
                        <FieldGroup className="stacked">
                            <TextField label="First Name" />
                            <SearchField label="Search Field" />
                            <NumberField label="Age" />
                        </FieldGroup>
                    </Container>
                </Container>
            </Form>
        );
    }
}
