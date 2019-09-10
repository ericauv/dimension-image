import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DashedLineStyles = styled.div`
  border: 0.25px dashed black;
  width: ${props => props.length - 1}px;
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
const DashedLine = props => {
  const { x, y, dashedLength, alpha, flip } = props;
  const dashedAlpha = alpha + (flip ? Math.PI / 2 : (3 * Math.PI) / 2);

  return (
    <DashedLineStyles
      x={x}
      y={y}
      length={dashedLength}
      angle={dashedAlpha}
    ></DashedLineStyles>
  );
};

DashedLine.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  dashedLength: PropTypes.number,
  alpha: PropTypes.number,
  flip: PropTypes.bool
};

export default DashedLine;
