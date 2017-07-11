import React, { Component } from 'react';
import { FitLayout } from '../box/FitLayout';
import { VerticalLayout } from '../box/VerticalLayout';
import { HorizontalLayout } from '../box/HorizontalLayout';
import { Container } from '../box/Container';

export class Application extends Component
{
    render()
    {
        return (
            <Container id="react-app" layout="border" orientation="vertical">
                {this.props.children}
            </Container>
        );
    }
}

export class ApplicationHeader extends Component
{
    render()
    {
        return (
            <Container id="main-header" region="north" {...this.props}>
                {this.props.children}
            </Container>
        );
    }
}

export class ApplicationContainer extends Component
{
    render()
    {
        return (
            <Container id="main-container" layout="border" region="center">
                {this.props.children}
            </Container>
        );
    }
}

export class ApplicationContent extends Component
{
    render()
    {
        return (
            <Container id="main-content" region="center" {...this.props}>
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
