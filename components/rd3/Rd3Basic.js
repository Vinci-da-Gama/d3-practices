// import PropTypes from 'prop-types'

const Rd3Basic = ({}) => (
  <svg width="400" height="60">
    <rect x="0" y="0" width="50" height="50" fill="green" />
    <circle cx="90" cy="25" r="25" fill="red"></circle>
    <ellipse cx="145" cy="25" rx="15" ry="25" fill="grey" />
    <line x1="185" y1="5" x2="230" y2="40" stroke="blue" strokeWidth="5" />
    <text x="260" y="25" fontSize="20px" fontWeight="bold" fill="orange">
      Hello world
    </text>
  </svg>
);

/* Rd3Basic.propTypes = {
} */

export default Rd3Basic;
