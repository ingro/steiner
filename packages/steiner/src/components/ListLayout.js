import React, { Component, PropTypes } from 'react';
import Paginator from 'vivi/dist/Paginator';
import { Flex, Box } from 'reflexbox';

export default class ListLayout extends Component {
    componentDidMount() {
        this.props.list();
    }

    handleChangePage = (page) => {
        this.props.changePage(page);
    }

    handleChangePaginatorSize = (size) => {
        this.props.updateFilter('perPage', size);
    }

    render() {
        const { filters, total, filterComponent, tableComponent } = this.props;

        return (
            <Flex 
                wrap
                flexColumn
                style={{ height: 'calc(100vh - 80px)'}}
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
    changePage: PropTypes.func,
    filterComponent: PropTypes.func,
    filters: PropTypes.object,
    // isFetching: PropTypes.bool,
    // items: PropTypes.array,
    list: PropTypes.func,
    tableComponent: PropTypes.func,
    total: PropTypes.number
};