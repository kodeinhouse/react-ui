import React, { Component } from 'react';
import { Container } from '../box/Container';
import { VerticalLayout } from '../box/VerticalLayout';

export class TabPanel extends Container
{
    constructor(props)
    {
        super(props);

        this.state = {
            selected: 0
        };
    }

    renderHeader()
    {
        var headers = [];

        function createTabStrip(item, index)
        {
            var active = this.state.selected == index;

            if(item.props && item.props.title && item.props.displayTitle)
                item.props.displayTitle = false;

            return (<li key={index} className={active ? "active": null}><a href="#" onClick={this.handleOnClick.bind(this, index)}>{item.props.title}</a></li>);
        }

        return (<ul className="tab-stripe region-north">{this.props.children.map(createTabStrip.bind(this))}</ul>);
    }

    renderTabs()
    {
        let selected = this.state.selected;

        return React.Children.map(this.props.children, function(child, index){
            return React.cloneElement(child, {
                active: (selected == index)
            });
        });
    }

    handleOnClick(index, event)
    {
        event.preventDefault();

        this.setState({selected: index});
    }

    render()
    {
        let classes = ['tab-panel', this.props.theme];

        return (
            <VerticalLayout className={classes.join(' ')} style={this.props.style}>
                {this.renderHeader()}
                {this.renderTabs()}
            </VerticalLayout>
        );
    }
}

TabPanel.defaultProps = {
    theme: 'neutral'
};
