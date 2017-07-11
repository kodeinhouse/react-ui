import React, { Component } from 'react';
import { Container } from 'components';
import { Application } from 'components';
import { Menu, MenuItem, Icon, Badge, Link as MenuLink } from 'components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export class Demo extends Component
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
                            <Link to="/about" className="link">About</Link>
                        </MenuItem>
                        <MenuItem active={true}>
                            <MenuLink path="/"><span>This is a sub link</span><Badge /></MenuLink>
                                <Menu>
                                    <MenuItem>
                                        <MenuLink path="/">This is a sub link</MenuLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <MenuLink path="/">This is a sub link</MenuLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <MenuLink path="/">This is a sub link</MenuLink>
                                    </MenuItem>
                                </Menu>
                        </MenuItem>
                        <MenuItem>
                            <MenuLink path="/">This is a sub link</MenuLink>
                        </MenuItem>
                    </Menu>
                </MenuItem>
                <MenuItem>
                    <MenuLink path="/customers"><Icon className="customer" /><span>Customers</span></MenuLink>
                    <Menu></Menu>
                </MenuItem>
                <MenuItem>
                    <MenuLink path="/invoices"><Icon className="invoice" /><span>Invoices</span></MenuLink>
                    <Menu></Menu>
                </MenuItem>
                <MenuItem>
                    <MenuLink path="/coupons"><Icon className="coupon" /><span>Coupons</span></MenuLink>
                    <Menu></Menu>
                </MenuItem>
            </Menu>
        );
    }

    render()
    {
        console.log('rendering again');

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
                        <Application.Content>
                            <Route exact path="/" component={() => { return <Container>Home Path</Container>}}/>
                            <Route path="/about" component={() => { return <Container>About Path</Container>}}/>
                            <Route path="/topics" component={() => { return <Container>Topics Path</Container>}}/>
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
