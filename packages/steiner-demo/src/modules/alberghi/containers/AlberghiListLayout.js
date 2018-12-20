import React, { Component } from "react";
import PropTypes from "prop-types";
import { connectCreator, ListLayout } from "steiner";
import { Redirect } from "react-router";
import qs from "query-string";
import _ from "lodash";

import { actions } from "../actions/alberghi";
import { selectors } from "../reducers/alberghi";
import AlberghiListFilter from "../components/AlberghiListFilter";
import AlberghiListTable from "../components/AlberghiListTable";

// import React, { Component, PropTypes } from 'react';
import Paginator from "vivi/lib/Paginator";
// import TranslatorHoc from 'vivi/lib/TranslatorHoc';
import queryString from "query-string";

class ListLayoutCustom extends Component {
  componentDidMount() {
    if (this.props.clientFilters) {
      this.props.list();
    }

    this.props.syncFilters(this.getFiltersFromQuerystring());
    // this.props.setFilters(this.getFiltersFromQuerystring());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filters !== this.props.filters && !this.props.clientFilters) {
      this.props.list();
    }

    if (
      this.props.currentRoute.location.search !==
        prevProps.currentRoute.location.search &&
      this.props.currentRoute.action === "POP"
    ) {
      this.props.checkFilterSync(this.getFiltersFromQuerystring());
    }
  }

  componentWillUnmount() {
    this.props.resetFilters();
  }

  handleChangePage = page => {
    this.props.changePage(page);
  };

  handleChangePaginatorSize = size => {
    this.props.updateFilter("perPage", size);
  };

  getFiltersFromQuerystring() {
    return queryString.parse(window.location.search);
  }

  render() {
    const {
      clientFilters,
      displayingLabel,
      filters,
      items,
      total,
      filterComponent,
      tableComponent
    } = this.props;

    return (
      <div
        className="ListLayout--Wrapper"
        style={{ display: "flex", flexFlow: "column wrap" }}
      >
        <div>{React.createElement(filterComponent, this.props)}</div>
        <div style={{ flexGrow: 1 }}>
          {React.createElement(tableComponent, this.props)}
        </div>
        <div style={clientFilters ? { height: "30px", marginTop: "25px" } : {}}>
          {clientFilters && (
            <div className="text-right">
              {displayingLabel}{" "}
              <strong>
                {items.length}/{total}
              </strong>
            </div>
          )}
          {!clientFilters && (
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
          )}
        </div>
      </div>
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
  displayingLabel: "Showing"
};

// export default TranslatorHoc(ListLayout, {
//     displayingLabel: 'steiner.labels.displaying'
// });

class AlberghiListLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRedirect: this.getShouldRedirect(props),
      redirectTo: this.getRedirectTo(props)
    };
  }

  getShouldRedirect(props) {
    return !_.get(props, "location.query.positionId");
  }

  getRedirectTo(props) {
    const location = {
      pathname: "/alberghi",
      search: qs.stringify(_.merge(props.location.query || {}, {
        positionId: 4
      }))
    };

    return location;
  }

  componentDidMount() {
      this.setState({
          shouldRedirect: false
      });
  }

//   componentDidUpdate(prevProps) {
//     if (this.state.shouldRedirect === false) {
//       return;
//     }

//     const shouldRedirect = this.getShouldRedirect(this.props);

//     if (shouldRedirect === false) {
//       this.setState({
//         shouldRedirect: false
//       });
//     }
//   }

  render() {
    const { shouldRedirect, redirectTo } = this.state;

    if (shouldRedirect) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <div>
        <ListLayoutCustom
          {...this.props}
          filterComponent={AlberghiListFilter}
          tableComponent={AlberghiListTable}
        />
      </div>
    );
  }
}

export default connectCreator.connectList(
  AlberghiListLayout,
  actions,
  selectors
);
