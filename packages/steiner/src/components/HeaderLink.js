import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const HeaderLink = (props) => <Link to={props.to} activeClassName="active" location={props.location}>{
    ({ isActive, onClick, href }) => <li className={isActive ? 'active' : ''}>
        <a href={href} onClick={onClick}>{props.name}</a>
    </li>
}</Link>;

HeaderLink.propTypes = {
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default HeaderLink;