import React, { Component, PropTypes } from 'react';
import Paginator from 'vivi/lib/Paginator';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';
import { Flex, Box } from 'reflexbox';
import queryString from 'query-string';

export class ListLayout extends Component {
    componentDidMount() {
        if (this.props.clientFilters) {
            this.props.list();
        }

        this.props.syncFilters(this.getFiltersFromQuerystring());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filters !== this.props.filters && !this.props.clientFilters) {
            this.props.list();
        }

        if ((nextProps.currentRoute.location.search !== this.props.currentRoute.location.search) && nextProps.currentRoute.action === 'POP') {
            this.props.checkFilterSync(this.getFiltersFromQuerystring());
        }
    }

    componentWillUnmount() {
        this.props.resetFilters();
    }

    handleChangePage = (page) => {
        this.props.changePage(page);
    }

    handleChangePaginatorSize = (size) => {
        this.props.updateFilter('perPage', size);
    }

    getFiltersFromQuerystring() {
        return queryString.parse(window.location.search);
    }

    render() {
        const { clientFilters, displayingLabel, filters, items, total, filterComponent, tableComponent } = this.props;

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
                        <div className="text-right">{displayingLabel} <strong>{items.length}/{total}</strong></div>
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
    displayingLabel: PropTypes.string,
    tableComponent: PropTypes.func,
    total: PropTypes.number
};

ListLayout.defaultProps = {
    clientFilters: false,
    displayingLabel: 'Showing'
};

export default TranslatorHoc(ListLayout, {
    displayingLabel: 'steiner.labels.displaying'
});