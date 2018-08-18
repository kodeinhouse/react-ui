import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { GridPanel } from '../src/components/GridPanel.jsx';
import { Container } from '../src/components/Container.jsx';
import { Toolbar } from '../src/components/Toolbar.jsx';
import { DialogComponent } from '../src/components/DialogComponent.jsx';

export class CheckGridPanelDemo extends Component
{
    constructor(props)
    {
        super(props);

        this.openDialog = this.openDialog.bind(this);
        this.onClickItem = this.onClickItem.bind(this);
        this.onCheckAllUnCheckAll = this.onCheckAllUnCheckAll.bind(this);
        this.records = [];
        this.selectRecords = 0;
    }

    openDialog()
    {
    }
    /*onSelectionChange(current, previous)
    {
        console.log(current);
        console.log(previous)
    }*/
    onClickItem(event)
    {
        let checked = event.target.checked;
        let totalRecords = this.records.length;

        if (!checked)
        {
            this.selectRecords--;
            this.refs.toolbar.unChecked();
        }
        else
        {
            this.selectRecords++;
            if(this.selectRecords == totalRecords)
                this.refs.toolbar.checked();
        }
    }

    onCheckAllUnCheckAll(value)
    {
        this.refs.toolbar.setChecked(value);
        let table = document.getElementById('previousGridId');
        let rowCheck = table.querySelectorAll('input[type=checkbox]');

        for (var i = 0; i < rowCheck.length; i++)
        {
            rowCheck[i].checked = value;
        }

        if(value)
          this.selectRecords = this.records.length;
        else
          this.selectRecords = 0;
    }
    getGridPanel(fit)
    {
        let minWidth = (fit == 'normal' ? 150 : null);
        let self = this;

        var columns = [
        {
            header: 'Check',
            dataIndex: 'Check',
            minWidth: minWidth,
            renderer: function(record)
            {
                return <input type="checkbox" onClick={self.onClickItem}/>;
            }
        },
        {
            header: 'Stock #',
            dataIndex: 'StockNumber',
            minWidth: minWidth
        },
        {
            header: 'VIN',
            renderer: function(record)
            {
                return record.VIN;
            },
            minWidth: minWidth
        },
        {
            header: 'Year',
            dataIndex: 'Year',
            minWidth: minWidth
        },
        {
            header: 'Make',
            dataIndex: 'Make',
            minWidth: minWidth
        },
        {
            header: 'Model',
            dataIndex: 'Model',
            minWidth: minWidth
        },
        {
            header: 'Trim',
            dataIndex: 'Trim',
            minWidth: minWidth
        },
        {
            header: 'Style',
            dataIndex: 'Style',
            minWidth: minWidth
        },
        {
            header: 'Active',
            dataIndex: 'Active',
            minWidth: minWidth
        },
        {
            header: 'Miles',
            dataIndex: 'Miles',
            minWidth: minWidth
        },
        {
            header: 'Sticker Price',
            dataIndex: 'StickerPrice',
            align: 'right',
            format: 'money',
            minWidth: minWidth
        },
        {
            header: 'Lot',
            dataIndex: 'Lot',
            minWidth: minWidth
        },
        {
            header: 'Phone',
            dataIndex: 'Phone',
            minWidth: minWidth
        }];


        for(var i = 0; i < 10; i++)
              this.records.push({
                  key: i.toString(),
                  StockNumber: 1600 + i,
                  VIN: 'WDDGF4HB7DR262079',
                  Year: 2009,
                  Make: 'Toyota',
                  Model: 'Camry',
                  Trim: 'XL',
                  Style: 'Sedan',
                  Color: 'Red',
                  Active: ((Math.random() ^ i) % 2) == 0,
                  Miles: 2592,
                  StickerPrice: 14999,
                  Lot: 'Miami',
                  Phone: '555-2332'
          });

          var items = [{
              text: 'Check All',
              type: 'check',
              handler: function(event)
              {
                  let check = event.target.checked;
                  self.onCheckAllUnCheckAll(check);
              }
          },
          {
              text: 'New',
              cls: 'button-new',
              handler: this.openDialog
          }];

          let toolbar =(<Toolbar items={items} ref="toolbar"/>);

          return <GridPanel
              id="previousGridId"
              toolbar={toolbar}
              title="Inventory"
              columns={columns}
              records={this.records}/>;
    }
    getDialogPanel()
    {
        return (<DialogComponent ref="dialog" modal={true}>
                    {this.getGridPanel('fit')}
                </DialogComponent>);
    }
    openDialog()
    {
        this.refs.dialog.open();
    }
    onRowClick(record)
    {

    }
    render()
    {
        return (<div className="center vbox">
                    {this.getGridPanel('normal')}
                </div>);
    }
}
