import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

export default class ListItem extends PureComponent {
    handleItemCheckedChange = e => this.props.onChange({
        ...this.props.value,
        checked: e.target.checked
    })

    handleItemNameChange = e => this.props.onChange({
        ...this.props.value,
        value: e.target.value
    })

    render(){
        const { value: { id, value, checked }} = this.props;
        const { handleItemCheckedChange, handleItemNameChange } = this;

        return (
            <TableRow className="item">
                <TableRowColumn>{id}</TableRowColumn>
                <TableRowColumn>
                    <TextField id={id} value={value} onChange={handleItemNameChange} />
                </TableRowColumn>
                <TableRowColumn >
                    <Checkbox checked={checked} onCheck={handleItemCheckedChange} />
                </TableRowColumn>
            </TableRow>
        )
    }
}