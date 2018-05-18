import React, { Component } from 'react';
import { Button } from './Button';
import { DialogPanel } from './DialogPanel';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ReactDOM from 'react-dom';
import { Container } from '../../container/Container';

export class DialogComponent extends Component
{
    static get defaultProps(){
        let transition = 'fast';

        let transitions = {
            'slow': {
                transitionEnterTimeout:1000,
                transitionAppearTimeout:800,
                transitionLeaveTimeout:500
            },
            'fast': {
                transitionEnterTimeout: 0,
                transitionAppearTimeout: 0,
                transitionLeaveTimeout: 0
            }
        };

        return Object.assign({
            modal: false,
            transition: transition
        }, transitions[transition]);
    }

    constructor(props)
    {
        super(props);

        this.state = {
            opened: props.opened || false
        };

        this.onHide = this.onHide.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    componentDidUpdate()
    {
        /*if(!this.resizeSensor)
        {
            try {
                let element = ReactDOM.findDOMNode(this);

                if(element != null)
                {
                    element = element.querySelector(".overlay");

                    if(element != null){
                        const ResizeSensor = require("css-element-queries/src/ResizeSensor");

                        // Start sensor to detect resize
                        this.resizeSensor = new ResizeSensor(element, this.onResize);
                    }
                }
            }
            catch (e) {
                console.log(e.message);
            }
            finally {

            }
        }*/
    }

    onResize()
    {
        /*let element = ReactDOM.findDOMNode(this);

        if(this.state.opened)
        {
            let dialog = element.querySelector('.dialog');

            if(this.props.position != 'relative')
            {
                dialog.style.marginTop = ''; // We let the browser calculate automatically the new position
                dialog.style.marginTop = dialog.getBoundingClientRect().top + 'px'; // Then we get control of it again
            }
        }*/
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

    renderContent()
    {
        let display = this.state.opened ? '' : 'none';

        // Compatibility while we delete the DialogPanel
        if(!this.props.plain)
        {
            return (
                <DialogPanel id={this.props.id} title={this.props.title} width={this.props.width} footer={this.getFooter()} position={this.props.position} className={this.props.className} style={{display: display}}>
                    {this.props.children}
                </DialogPanel>
            );
        }
        else
        {
            let classes = ['dialog'];
            let style = Object.assign({}, this.props.style)

            style.width = this.props.width;
            style.height = this.props.height;
            style.display = display;

            return (
                <Container id={this.props.id} layout="border" orientation="vertical" className={classes.join(' ')} style={style}>
                    {this.props.children}
                </Container>
            );
        }
    }

    render()
    {
        let classes = ['overlay', this.props.position];

        return (
            <div>{
                    this.state.opened ?
                        <div key={"my-overlay"} className={classes.join(' ')} onClick={this.onHide}>
                            {this.renderContent()}
                        </div>
                        : null
                }
            </div>
        );
    }
}

export class Dialog extends DialogComponent
{
    static get defaultProps()
    {
        let transition = 'fast';

        let transitions = {
            'slow': {
                transitionEnterTimeout:1000,
                transitionAppearTimeout:800,
                transitionLeaveTimeout:500
            },
            'fast': {
                transitionEnterTimeout: 700,
                transitionAppearTimeout: 400,
                transitionLeaveTimeout: 0
            }
        };

        return Object.assign({
            position: 'fixed',
            className: 'dialog',
            transition: transition
        }, transitions[transition]);
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
}

class DialogBody extends Component
{
    static get defaultProps()
    {
        return {
            region: 'center'
        };
    }

    render()
    {
        let classes = ['dialog-body'];

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.mask)
            classes.push('mask');

        return (
            <Container {...this.props} className={classes.join(' ')} >
                {this.props.children}
            </Container>
        );
    }
}

Dialog.Body = DialogBody;

class DialogHeader extends Component
{
    render()
    {
        let classes = ['dialog-header'];

        if(this.props.className)
            classes.push(this.props.className);

        return (
            <div {...this.props} className={classes.join(' ')}>
                {this.props.children}
            </div>
        );
    }
}

Dialog.Header = DialogHeader;

class DialogFooter extends Component
{
    render()
    {
        let classes = ['footer'];
        let style = Object.assign({borderTop: '1px outset', textAlign: 'right'}, this.props.style);

        if(this.props.className)
            classes.push(this.props.className);

        return (
            <div className={classes.join(' ')} style={style}>
                {this.props.children}
            </div>
        );
    }
}

Dialog.Footer = DialogFooter;
