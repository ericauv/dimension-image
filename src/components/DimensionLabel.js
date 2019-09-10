import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DimensionLabelStyles = styled.div`
  display: block;
  width: ${props => props.length}px;
  text-align: center;
  transform-origin: top left;
  transform: rotate(${props => props.angle}rad);
  -moz-transform: rotate(${props => props.angle}rad);
  -webkit-transform: rotate(${props => props.angle}rad);
  -o-transform: rotate(${props => props.angle}rad);
  -ms-transform: rotate(${props => props.angle}rad);
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  margin: 0;
  padding: 0;
`;

const DimensionLabel = props => {
  const { x1, y1, length, alpha, flip, dashedLength, text } = props;
  let { offset } = props;
  if (flip) {
    offset = -1 * offset;
  }
  const x = x1 + (offset + dashedLength) * Math.sin(alpha);
  const y = y1 - (offset + dashedLength) * Math.cos(alpha);
  return (
    <DimensionLabelStyles length={length} angle={alpha} x={x} y={y}>
      {text}
    </DimensionLabelStyles>
  );
};

DimensionLabel.propTypes = {
  text: PropTypes.string
};

export default DimensionLabel;
