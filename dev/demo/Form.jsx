import React, { Component } from 'react';
import { Form, TextField, NumberField } from 'form';

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
                    <Container className="half" style={{padding: '5px'}}>
                        <Form.Legend>Stacked Fields (Eager Validation)</Form.Legend>
                        <Form.FieldGroup className="stacked">
                            <Form.TextField label="First Name" placeholder="Enter your first name" required maxLength="5"/>
                            <Form.TextField label="Last Name" placeholder="Enter your last name" required/>
                            <Form.NumberField label="Age" placeholder="Enter your age" required />
                            <Form.DisplayField label="Date Format" className="inline" value="DDD">DD/MM/YYYY</Form.DisplayField>
                        </Form.FieldGroup>

                        <Form.Legend>Inline fields with label on top</Form.Legend>
                        <Form.FieldGroup className="inline">
                            <Form.TextField label="First Name" className="custom" error={false} required/>
                            <Form.TextField label="Last Name" className="border" error={false} required/>
                            <Form.NumberField label="Age" />
                        </Form.FieldGroup>

                        <Form.Legend>Inline fields with label at the left</Form.Legend>
                        <Form.FieldGroup className="inline">
                            <Form.TextField label="First Name" className="inline"/>
                            <Form.TextField label="Last Name" className="inline"/>
                            <Form.NumberField label="Age" className="inline"/>
                        </Form.FieldGroup>

                        <Form.Legend>Inline fields with label on top using the full width</Form.Legend>
                        <Form.FieldGroup className="inline equal">
                            <Form.TextField label="First Name"/>
                            <Form.TextField label="Last Name"/>
                            <Form.NumberField label="Age"/>
                        </Form.FieldGroup>

                        <Form.Legend>Inline fields with label at the left using the full width</Form.Legend>
                        <Form.FieldGroup className="inline equal">
                            <Form.TextField label="First Name" className="inline" required/>
                            <Form.TextField label="Last Name" className="inline"/>
                            <Form.NumberField label="Age"  className="inline"/>
                        </Form.FieldGroup>

                        <Form.RadioGroup name="gender" className="inline">
                            <Form.Label>Gender:</Form.Label>
                            <Form.RadioButton label="Male" />
                            <Form.RadioButton label="Female" />
                        </Form.RadioGroup>
                        <Form.NumberField label="Salary" currency="USD"/>
                        <Form.CheckGroup className="inline">
                            <Form.Label>Assets:</Form.Label>
                            <Form.CheckBox label="Own House"/>
                            <Form.CheckBox label="Own Car"/>
                        </Form.CheckGroup>
                        <Form.Dropdown label="Country" options={[{text: 'Nicaragua'}, {text: 'Canada'}, {text: 'Irlanda'}, {text: 'Noruega'}]}>
                            <Menu>
                                <MenuItem>Nicaragua</MenuItem>
                                <MenuItem>Canada</MenuItem>
                                <MenuItem>Irlanda</MenuItem>
                                <MenuItem>Noruega</MenuItem>
                            </Menu>
                        </Form.Dropdown>
                        <Form.TextArea label="Purpose"/>
                    </Container>
                    <Container className="half" style={{padding: '5px'}}>
                        <Form.Legend>Stacked Fields (Lazy Validation)</Form.Legend>
                        <Form.FieldGroup className="stacked">
                            <Form.TextField label="First Name (Lazy)" validation="lazy" required />
                            <Form.FormField validation="lazy" required>
                                <Form.Label>Last Name</Form.Label>
                                <TextField required />
                            </Form.FormField>
                            <Form.FormField validation="lazy" required>
                                <Form.Label>Age <span className="color red">*</span></Form.Label>
                                <NumberField  />
                            </Form.FormField>
                            <Form.SearchField label="Search Field" required/>
                            <Form.SpinnerField label="Spinner Field" value={1} min={0} template={"{number} Test"} required/>
                        </Form.FieldGroup>
                    </Container>
                </Container>
            </Form>
        );
    }
}
