import React, { Component } from 'react';
import { connectCreator } from 'steiner';
import Helmet from 'react-helmet';

import { actions } from '../actions/hotels';
import { selectors } from '../reducers/hotels';
import HotelsListFilter from '../components/HotelsListFilter';
import HotelsListTable from '../components/HotelsListTable';

import Paginator from 'vivi/lib/Paginator';
import { Flex, Box } from 'reflexbox';
import queryString from 'query-string';

class ListLayout extends Component {
    componentDidMount() {
        this.props.list();
    }

    handleChangePage = (page) => {
        this.props.changePage(page);
    }

    handleChangePaginatorSize = (size) => {
        this.props.updateFilter('perPage', size);
    }

    componentWillMount() {
        this.props.syncFilters(queryString.parse(window.location.search));
    }

    componentWillReceiveProps(nextProps) {
        // console.warn(nextProps);
        if (nextProps.location.search !== this.props.location.search) {
            this.props.dispatch({
                type: 'hotels/CHECK_SYNC',
                payload: queryString.parse(window.location.search)
            });
        }
    }

    render() {
        const { filters, total, filterComponent, tableComponent } = this.props;

        return (
            <Flex 
                wrap
                flexColumn
                style={{ height: 'calc(100vh - 75px)'}}
            >
                <Box col={12}>
                    {React.createElement(filterComponent, this.props)}
                </Box>
                <Box col={12} style={{ flexGrow: 1 }}>
                    {React.createElement(tableComponent, this.props)}
                </Box>
                <Box col={12}>
                    <Paginator 
                        current={filters.page} 
                        pageSize={filters.perPage} 
                        total={total} 
                        showStatusText={true}
                        showSizeChanger={true}
                        onSizeChange={this.handleChangePaginatorSize}
                        sizeOptions={[10, 20, 50]} 
                        onChange={this.handleChangePage}
                        sizeChangerOptions={{ openUp: true }}
                    />
                </Box>
            </Flex>
        );
    }
}

ListLayout.propTypes = {
    changePage: React.PropTypes.func,
    filterComponent: React.PropTypes.func,
    filters: React.PropTypes.object,
    list: React.PropTypes.func,
    tableComponent: React.PropTypes.func,
    total: React.PropTypes.number
};

class HotelsListLayout extends Component {
    render() {
        return (
            <div>
                <Helmet title="Hotels" />
                <ListLayout
                    {...this.props}
                    filterComponent={HotelsListFilter}
                    tableComponent={HotelsListTable}
                />
            </div>
        )
    }
}

export default connectCreator.connectList(HotelsListLayout, actions, selectors);