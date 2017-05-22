import React, { Component } from 'react';
import { Button } from './Button';
import { DialogPanel } from './DialogPanel';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export class DialogComponent extends Component
{
    static get defaultProps(){
        return {
            modal: false
        };
    }
    constructor(props)
    {
        super(props);

        this.state = {
            opened: props.opened || false
        };

        this.onHide = this.onHide.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    onHide(event)
    {
        // Close the modal only if the click was directly on the overlay
        if(!this.props.modal && event.target.classList.contains('overlay'))
            this.close();

        if(this.props.onHide)
            this.props.onHide(event);
    }
    onClose(event)
    {
        this.setState({opened: false});

        if(this.props.onClose)
            this.props.onClose(event);
    }
    open()
    {
        this.setState({opened: true});
    }
    close(event)
    {
        this.onClose(event);
    }
    getFooter()
    {
        let footer = null;

        function createButton(item)
        {
            if(item.key == 'close')
                return (<Button key={item.key} onClick={this.close.bind(this)}>{item.text}</Button>);
            else
                return (<Button key={item.key} onClick={item.handler}>{item.text}</Button>);
        }

        let buttons = [];

        if(this.props.bbar){
            buttons = this.props.bbar.map(createButton.bind(this));
            footer = <div className="dialog-footer align-right">{buttons}</div>;
        }

        return footer;
    }
    render()
    {
        let display = this.state.opened ? '' : 'none';
        let height = this.state.opened ? '100%' : '0px';

        return (
            <CSSTransitionGroup
                component="div"
                transitionEnterTimeout={1000}
                transitionAppearTimeout={800}
                transitionLeaveTimeout={500}
                transitionName="dialog"
                transitionAppear={true}
                transitionEnter={true}
                transitionLeave={true}>

                    {
                        this.state.opened ?
                            <div key={"my-overlay"} className="overlay" onClick={this.onHide} style={{display: display}}>
                            <DialogPanel id={this.props.id} title={this.props.title} footer={this.getFooter()} className={this.props.className} style={{display: display}}>
                                {this.props.children}
                            </DialogPanel>
                            </div>
                            : null
                    }
            </CSSTransitionGroup>
        );
    }
}

export class Dialog extends DialogComponent
{
    static get defaultProps()
    {
        return {
            className: 'dialog'
        };
    }
    componentWillReceiveProps(nextProps)
    {
        this.setState({opened: nextProps.opened});
    }
    open(callback)
    {
        if(callback && typeof callback == 'function')
            this.onOpen = callback;

        this.setState({opened: true}, this.onOpen);
    }
    close(callback)
    {
        if(callback && typeof callback == 'function')
            this.onClose = callback;

        this.setState({opened: false}, this.onClose);
    }
    onOpen()
    {

    }
    onClose()
    {

    }
}

export class DialogFooter extends Component
{
    render()
    {
        return (
            <div className="footer">
                {this.props.children}
            </div>
        );
    }
}
