import React, { Component } from 'react';
import { TabPanel, TabItem } from 'container';

export class TabPanelDemo extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <TabPanel region="center">
                <TabItem title="Tab 1">Tab 1</TabItem>
                <TabItem title="Tab 2">Tab 2</TabItem>
            </TabPanel>
        );
    }
}
