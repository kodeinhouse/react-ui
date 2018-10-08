import React, { Component } from 'react';
import { Container } from 'container';
import { Application } from 'react-layout';
import { Menu, MenuItem, Icon, Badge, Link as MenuLink } from 'components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { FormDemo } from './FormDemo';
import { RadioFormDemo } from './RadioFormDemo';
import { TabPanelDemo } from './TabPanelDemo';
import { ChartDemo } from './ChartDemo';
import { DnD } from './DnD';
import { Calendar } from './Calendar';

export class App extends Component
{
    renderMenu()
    {
        return (
            <Menu>
                <MenuItem active={true}>
                    <MenuLink path="/">
                        <Icon className="dashboard" />
                        <span>Dashboard</span>
                        <Badge>3</Badge>
                        <Badge>4</Badge>
                    </MenuLink>
                    <Menu>
                        <MenuItem>
                            <Link to="/form" className="link">Form</Link>
                        </MenuItem>
                        <MenuItem active={true}>
                                <Link to="/textfield" className="link"><span>Text Fields</span><Badge /></Link>
                                <Menu>
                                    <MenuItem>
                                        <Link to="/radiobutton" className="link">Radio Buttons</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to="/checkbox" className="link">Check Boxes</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to="/dropdown" className="link">Dropdowns</Link>
                                    </MenuItem>
                                </Menu>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/navigation" className="link">Navigation</Link>
                        </MenuItem>
                    </Menu>
                </MenuItem>
                <MenuItem>
                    <Link to="/tabpanel" className="link">Tab Panel</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/chart" className="link">Chart</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/dnd" className="link">Drag n Drop</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/calendar" className="link">Calendar</Link>
                </MenuItem>
                <MenuItem>
                    <MenuLink path="/horizontal-nav"><Icon className="customer" /><span>Horizontal</span></MenuLink>
                    <Menu></Menu>
                </MenuItem>
            </Menu>
        );
    }

    render()
    {
        // Rendering Router here prevents the app from realoading the whole component
        return (
            <Router>
                <Application>
                    <Application.Header layout="border">
                        <Container width="208px">Logo</Container>
                        <Container region="center">Menu</Container>
                    </Application.Header>
                    <Application.Container>
                        <Application.Navigation>
                            {this.renderMenu()}
                        </Application.Navigation>
                        <Application.Content scrollable={true}>
                            <Route exact path="/" component={() => { return <Container>Home Path</Container>}}/>
                            <Route path="/form" component={() => { return <FormDemo />}}/>
                            <Route path="/textfield" component={() => { return <Container>Text Field Demo</Container>}}/>
                            <Route path="/radiobutton" component={() => { return <RadioFormDemo />}}/>
                            <Route path="/checkbox" component={() => { return <Container>Check Box Demo</Container>}}/>
                            <Route path="/dropdown" component={() => { return <Container>Dropdown Demo</Container>}}/>
                            <Route path="/tabpanel" component={() => { return <TabPanelDemo /> }} />
                            <Route path="/navigation" component={() => { return <Container>Navigation Demo</Container>}}/>
                            <Route path="/chart" component={ChartDemo} />
                            <Route path="/dnd" component={DnD} />
                            <Route path="/calendar" component={Calendar} />
                        </Application.Content>
                        <Application.Aside>
                            Aside
                        </Application.Aside>
                    </Application.Container>
                    <Application.Footer>
                        Footer
                    </Application.Footer>
                </Application>
            </Router>
        );
    }
}
