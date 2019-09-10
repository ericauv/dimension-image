import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LineStyles = styled.div`
  border: 1px solid black;
  width: ${props => props.length}px;
  height: 0px;
  transform: rotate(${props => props.angle}rad);
  transform-origin: top left;
  -moz-transform: rotate(${props => props.angle}rad);
  -webkit-transform: rotate(${props => props.angle}rad);
  -o-transform: rotate(${props => props.angle}rad);
  -ms-transform: rotate(${props => props.angle}rad);
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;
const Line = props => {
  const { x, y, length, alpha } = props;
  return <LineStyles x={x} y={y} length={length} angle={alpha}></LineStyles>;
};

Line.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  length: PropTypes.number,
  alpha: PropTypes.number
};

export default Line;
