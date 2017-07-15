import React, { Component } from 'react';
import { FitLayout } from '../box/FitLayout';
import { VerticalLayout } from '../box/VerticalLayout';
import { HorizontalLayout } from '../box/HorizontalLayout';
import { Container } from '../box/Container';
import { clone } from 'lodash';

export class Application extends Component
{
    render()
    {
        let props = Object.assign({orientation: 'vertical', layout: 'border'}, this.props);

        return (
            <Container id="react-app" {...props}>
                {this.props.children}
            </Container>
        );
    }
}

export class ApplicationHeader extends Component
{
    render()
    {
        let props = Object.assign({region: 'north'}, this.props);

        return (
            <Container id="main-header" {...props}>
                {this.props.children}
            </Container>
        );
    }
}

export class ApplicationContainer extends Component
{
    render()
    {
        let props = Object.assign({layout:"border", region:"center"}, clone(this.props));

        return (
            <Container id="main-container" {...props}>
                {this.props.children}
            </Container>
        );
    }
}

export class ApplicationContent extends Component
{
    render()
    {
        let props = Object.assign({region: 'center'}, this.props);

        return (
            <Container id="main-content" region="center" {...props}>
                {this.props.children}
            </Container>
        );
    }
}

export class ApplicationNavigation extends Component
{
    render()
    {
        return <Container id="main-nav" {...this.props}>{this.props.children}</Container>;
    }
}

export class ApplicationAside extends Component
{
    render()
    {
        return (
            <Container id="main-aside" {...this.props}>
                {this.props.children}
            </Container>
        );
    }
}

export class ApplicationFooter extends Component
{
    render()
    {
        return (
            <Container id="main-footer" {...this.props}>
                {this.props.children}
            </Container>
        );
    }
}

Application.Aside = ApplicationAside;
Application.Header = ApplicationHeader;
Application.Footer = ApplicationFooter;
Application.Content = ApplicationContent;
Application.Container = ApplicationContainer;
Application.Navigation = ApplicationNavigation;
