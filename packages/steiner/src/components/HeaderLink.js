import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const HeaderLink = (props) => <Link to={props.to} location={props.location}>{
    ({ isActive, onClick, href }) => <li className={isActive ? 'active' : ''}>
        <a href={href} onClick={onClick}>{props.name}</a>
    </li>
}</Link>;

HeaderLink.propTypes = {
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default HeaderLink;