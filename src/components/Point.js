import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PointStyles = styled.div`
    width:${props => props.radius}px
    height:${props => props.radius}px;
    left:${props => props.x - props.radius / 2}px;
    top:${props => props.y - props.radius / 2}px;
    border-radius:50%;
    background:white;
    position:absolute;
`;

const Point = props => (
  <PointStyles radius={props.radius} x={props.x} y={props.y}></PointStyles>
);

Point.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  radius: PropTypes.number
};

export default Point;
