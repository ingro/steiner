import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paginator from 'vivi/lib/Paginator';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';
import queryString from 'query-string';
import _ from 'lodash';

export class ListLayout extends Component {
    componentDidMount() {
        if (this.props.clientFilters) {
            this.props.list();
        }

        this.props.syncFilters(this.getFiltersFromQuerystring());

        if (this.props.forceFetchOnMount) {
            this.props.list();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (! _.isEqual(nextProps.filters, this.props.filters) && ! this.props.clientFilters) {
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
        const { contentStyle, filterBoxStyle, filterComponent, tableComponent, wrapperStyle } = this.props;

        return (
            <div className="ListLayout--Wrapper" style={wrapperStyle}>
                <div className="ListLayout--Filters" style={filterBoxStyle}>
                    {React.createElement(filterComponent, this.props)}
                </div>
                <div className="ListLayout--Content" style={contentStyle}>
                    {React.createElement(tableComponent, this.props)}
                </div>
                <div className="ListLayout--Footer" style={this.getFooterBoxStyle()}>
                    {this.renderFooter()}
                </div>
            </div>
        );
    }
}

ListLayout.propTypes = {
    changePage: PropTypes.func,
    clientFilters: PropTypes.bool,
    contentStyle: PropTypes.object,
    displayingLabel: PropTypes.string,
    filterBoxStyle: PropTypes.object,
    filterComponent: PropTypes.func,
    filters: PropTypes.object,
    forceFetchOnMount: PropTypes.bool,
    footerBoxStyle: PropTypes.object,
    footerComponent: PropTypes.func,
    items: PropTypes.array,
    list: PropTypes.func,
    paginatorSizeOptions: PropTypes.array,
    resetFilters: PropTypes.func,
    resetOnClose: PropTypes.bool,
    selected: PropTypes.array,
    showCustomFooter: PropTypes.bool,
    syncFilters: PropTypes.func,
    tableComponent: PropTypes.func,
    total: PropTypes.number,
    wrapperStyle: PropTypes.object
};

ListLayout.defaultProps = {
    clientFilters: false,
    contentStyle: {},
    displayingLabel: 'Showing',
    filterBoxStyle: {},
    filters: {},
    forceFetchOnMount: false,
    footerBoxStyle: {},
    paginatorSizeOptions: [20, 50, 100],
    resetFilters: () => {},
    resetOnClose: true,
    selected: [],
    showCustomFooter: false,
    syncFilters: () => {},
    wrapperStyle: {}
};

export default TranslatorHoc(ListLayout, {
    displayingLabel: 'steiner.labels.displaying'
});