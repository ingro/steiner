import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        if (this.props.resetOnClose) {
            this.props.resetFilters();
        }
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

    getFooterBoxStyle() {
        const { clientFilters, footerBoxStyle } = this.props;

        if (clientFilters) {
            return { 
                height: '30px', 
                marginTop: '25px' 
            };
        }

        return footerBoxStyle;
    }

    renderFooter() {
        const { clientFilters, displayingLabel, filters, footerComponent, items, paginatorSizeOptions, showCustomFooter, total } = this.props;

        if (showCustomFooter) {
            return React.createElement(footerComponent, this.props);
        }

        if (clientFilters) {
            return <div className="text-right">{displayingLabel} <strong>{items.length}/{total}</strong></div>
        }

        return <Paginator
            current={filters.page}
            pageSize={filters.perPage}
            total={total}
            showStatusText={true}
            showSizeChanger={true}
            onSizeChange={this.handleChangePaginatorSize}
            sizeOptions={paginatorSizeOptions}
            onChange={this.handleChangePage}
            sizeChangerOptions={{ openUp: true }}
        />;
    }

    render() {
        const { filterComponent, tableComponent } = this.props;

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
                <Box col={12} style={this.getFooterBoxStyle()}>
                    {this.renderFooter()}
                </Box>
            </Flex>
        );
    }
}

ListLayout.propTypes = {
    changePage: PropTypes.func,
    clientFilters: PropTypes.bool,
    displayingLabel: PropTypes.string,
    filterComponent: PropTypes.func,
    filters: PropTypes.object,
    footerBoxStyle: PropTypes.object,
    footerComponent: PropTypes.func,
    items: PropTypes.array,
    list: PropTypes.func,
    paginatorSizeOptions: PropTypes.array,
    resetOnClose: PropTypes.bool,
    showCustomFooter: PropTypes.bool,
    tableComponent: PropTypes.func,
    total: PropTypes.number
};

ListLayout.defaultProps = {
    clientFilters: false,
    displayingLabel: 'Showing',
    footerBoxStyle: {},
    paginatorSizeOptions: [10, 20, 50],
    resetOnClose: true,
    showCustomFooter: false
};

export default TranslatorHoc(ListLayout, {
    displayingLabel: 'steiner.labels.displaying'
});