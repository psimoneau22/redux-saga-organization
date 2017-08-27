import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn } from 'material-ui/Table';
import { itemsRequested, filterChanged, itemChanged } from '../sagas/list';
import ListItem from './ListItem';
import './list.css'

class MyList extends PureComponent {    
    componentDidMount() {
        this.props.itemsRequested();
    }

    handleFilterChange = e => this.props.filterChanged(e.target.value);
    
    render () {
        let { handleFilterChange } = this;
        let { items, filter, loading, itemChanged } = this.props;

        return (
            <div>
                <TextField floatingLabelText="Filter" value={filter} onChange={handleFilterChange} />
                <Table onRowSelection={() => console.log('ad')}>
                    <TableHeader displaySelectAll={true} adjustForCheckbox={true}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Value</TableHeaderColumn>
                            <TableHeaderColumn>Checked</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={true}>
                    {
                        loading
                        ? <TableRow>...loading</TableRow>
                        : items.map(item => <ListItem key={item.id} value={item} onChange={itemChanged} />)
                    }  
                    </TableBody>
                </Table>                  
            </div>
        );
    }
}

export default connect(
    state => ({
        ...state.list,
    }),
    {
        itemsRequested,
        filterChanged,
        itemChanged,
    }
)(MyList)