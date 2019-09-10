import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DimensionLabel from './DimensionLabel';
const LineStyles = styled.div`
  border: 0.5px solid black;
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
const DimensionLine = props => {
  const { x1, y1, length, alpha, flip, offset, text } = props;
  let { dashedLength } = props;
  if (flip) {
    dashedLength = -1 * dashedLength;
  }
  const x = x1 + dashedLength * Math.sin(alpha);
  const y = y1 - dashedLength * Math.cos(alpha);
  return (
    <>
      <LineStyles x={x} y={y} length={length} angle={alpha}></LineStyles>
      <DimensionLabel
        x1={x1}
        y1={y1}
        length={length}
        alpha={alpha}
        dashedLength={dashedLength}
        offset={offset}
        flip={flip}
        text={text}
      ></DimensionLabel>
    </>
  );
};

DimensionLine.propTypes = {
  x1: PropTypes.number,
  y1: PropTypes.number,
  length: PropTypes.number,
  dashedLength: PropTypes.number,
  alpha: PropTypes.number,
  flip: PropTypes.bool
};

export default DimensionLine;
