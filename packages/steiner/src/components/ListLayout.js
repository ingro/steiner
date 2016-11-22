import React, { Component, PropTypes } from 'react';
import Paginator from 'vivi/lib/Paginator';
import { Flex, Box } from 'reflexbox';
import queryString from 'query-string';

export default class ListLayout extends Component {
    componentDidMount() {
        if (this.props.clientFilters) {
            this.props.list();
        }
        this.props.syncFilters(queryString.parse(window.location.search));
    }

    handleChangePage = (page) => {
        this.props.changePage(page);
    }

    handleChangePaginatorSize = (size) => {
        this.props.updateFilter('perPage', size);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.currentRoute.location.search !== this.props.currentRoute.location.search) && nextProps.currentRoute.action === 'POP') {
            this.props.checkFilterSync(queryString.parse(window.location.search));
        }
    }

    render() {
        const { clientFilters, filters, items, total, filterComponent, tableComponent } = this.props;

        return (
            <Flex
                wrap={true}
                flexColumn={true}
                style={{ height: 'calc(100vh - 75px)'}}
            >
                <Box col={12}>
                    {React.createElement(filterComponent, this.props)}
                </Box>
                <Box col={12} style={{ flexGrow: 1 }}>
                    {React.createElement(tableComponent, this.props)}
                </Box>
                <Box col={12} style={clientFilters ? { height: '30px', marginTop: '25px' } : {}}>
                    {clientFilters &&
                        <div className="text-right">Total: <strong>{items.length}</strong></div>
                    }
                    {! clientFilters &&
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
                    }
                </Box>
            </Flex>
        );
    }
}

ListLayout.propTypes = {
    changePage: PropTypes.func,
    clientFilters: PropTypes.bool,
    filterComponent: PropTypes.func,
    filters: PropTypes.object,
    items: PropTypes.array,
    list: PropTypes.func,
    tableComponent: PropTypes.func,
    total: PropTypes.number
};

ListLayout.defaultProps = {
    clientFilters: false
};