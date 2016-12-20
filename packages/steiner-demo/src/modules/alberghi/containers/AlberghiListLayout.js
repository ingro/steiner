import React, { Component } from 'react';
import { connectCreator, ListLayout } from 'steiner';


import { actions } from '../actions/alberghi';
import { selectors } from '../reducers/alberghi';
import AlberghiListFilter from '../components/AlberghiListFilter';
import AlberghiListTable from '../components/AlberghiListTable';

class AlberghiListLayout extends Component {
    render() {
        return (
            <div>
                
                <ListLayout
                    {...this.props}
                    filterComponent={ AlberghiListFilter }
                    tableComponent={ AlberghiListTable }
                />
            </div>
        );
    }
}

export default connectCreator.connectList(AlberghiListLayout, actions, selectors);