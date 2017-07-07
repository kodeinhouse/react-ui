import React, { Component } from 'react';
import { FitLayout } from '../box/FitLayout';
import { VerticalLayout } from '../box/VerticalLayout';
import { HorizontalLayout } from '../box/HorizontalLayout';

export class ApplicationLayout extends Component
{
    render()
    {
        return (
            <VerticalLayout id="react-app" style={{flex: '1 auto'}}>
                {this.props.children}
            </VerticalLayout>
        );
    }
}

export class Header extends Component
{
    render()
    {
        return (
            <HorizontalLayout id="main-header" region="north" className={this.props.className} style={this.props.style}>
                {this.props.children}
            </HorizontalLayout>
        );
    }
}

export class Container extends Component
{
    render()
    {
        return (
            <HorizontalLayout id="main-container" region="center">
                {this.props.children}
            </HorizontalLayout>
        );
    }
}

export class Content extends Component
{
    render()
    {
        return (
            <FitLayout id="main-content" region="center">
                {this.props.children}
            </FitLayout>
        );
    }
}

export class Navigation extends Component
{
    render()
    {
        let style = Object.assign({}, this.props.style);
        let classes = [];
        let id = this.props.id || "main-nav";
        let region = this.props.region || 'east';
        let width = this.props.width || "260px";

        // If a region was giving it means this component is being used inside a flex layout
        // So instead of assigning to the width property we use the flexBasis
        if(region && width)
            style.flexBasis = width;

        if(this.props.className)
            classes.push(this.props.className);

        if(region)
            classes.push('region-' + region);

        return <nav id={id} className={classes.join(' ')} style={style}>{this.props.children}</nav>;
    }
}

export class Aside extends Component
{
    render()
    {
        return null;
    }
}

export class Footer extends Component
{
    render()
    {
        return null;
    }
}

ApplicationLayout.Aside = Aside;
ApplicationLayout.Header = Header;
ApplicationLayout.Footer = Footer;
ApplicationLayout.Content = Content;
ApplicationLayout.Container = Container;
ApplicationLayout.Navigation = Navigation;
