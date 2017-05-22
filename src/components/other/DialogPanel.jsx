import React, { Component } from 'react';
import { Panel } from './Panel';

export class DialogPanel extends Panel
{
    constructor(props)
    {
        super(props);

        this.headerCls = 'dialog-header';
        this.bodyCls   = 'dialog-body vbox center';
    }
}

DialogPanel.defaultProps = {
    type: 'dialog',
    width: 660
};
