import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Line from './Line';
import DashedLine from './DashedLine';
import DimensionLine from './DimensionLine';
import Point from './Point';

const ContainerStyles = styled.div`
  width: 100vw;
  height: 100vh;
  &:hover {
    cursor: pointer;
  }
`;

class Container extends Component {
  handleClick = e => {
    const pointsSet = [...this.state.pointsSet];
    if (!pointsSet[0]) {
      pointsSet[0] = true;
      pointsSet[1] = false;
      const x1 = e.clientX;
      const y1 = e.clientY;
      this.setState({ pointsSet, x1, y1 });
    } else if (pointsSet[0] && pointsSet[1]) {
      pointsSet[0] = false;
      pointsSet[1] = false;
      const x1 = 0;
      const y1 = 0;
      const x2 = 0;
      const y2 = 0;
      this.setState({ pointsSet, x1, y1, x2, y2 });
    } else if (pointsSet[0] && !pointsSet[1]) {
      pointsSet[1] = true;
      const x2 = e.clientX;
      const y2 = e.clientY;
      this.setState({ pointsSet, x2, y2 });
    }
  };
  handleChange = ({ currentTarget: { value, name } }) => {
    const val = parseFloat(value);
    this.setState({ [name]: Math.abs(val), flip: val < 0 });
  };

  calculateAlpha = (x1, x2, y1, y2) => {
    const l = this.calculateLength(x1, x2, y1, y2);
    const aCos = Math.acos((x2 - x1) / l); // when alpha =< PI
    const aCosAbs = Math.acos(Math.abs(x2 - x1) / l); // when alpha > PI
    if (x1 === x2) {
      // vertical line
      if (y2 > y1) {
        return Math.PI / 2; // downwards vertical
      } else if (y2 < y1) {
        return (3 * Math.PI) / 2; // upwards vertical
      }
    } else if (x1 !== x2) {
      // non-vertical line
      if (y2 >= y1) {
        return aCos; // alpha>=PI
      } else if (y2 < y1) {
        if (x2 < x1) {
          return Math.PI + aCosAbs; // PI < alpha <3PI/2
        } else if (x2 > x1) {
          return 2 * Math.PI - aCosAbs; // 3PI/2 < alpha < 2PI
        }
      }
    }
    return 0; // x1=x2=y1=y2 both points are the same
  };
  calculateLength = (x1, x2, y1, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); // length
  };

  state = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    pointRadius: 15,
    pointsSet: [false, false],
    dashedLength: 100,
    flip: false
  };
  render() {
    const { x1, y1, x2, y2, pointRadius, dashedLength, flip } = this.state;
    const pointsSet = [...this.state.pointsSet];
    const alpha = this.calculateAlpha(x1, x2, y1, y2);
    const length = this.calculateLength(x1, x2, y1, y2);

    return (
      <ContainerStyles onClick={this.handleClick}>
        <form>
          <label>dashedLength</label>
          <input
            onClick={e => e.stopPropagation()}
            onChange={this.handleChange}
            defaultValue={this.state.dashedLength}
            name="dashedLength"
            type="number"
          ></input>
        </form>
        {pointsSet.every(value => value === true) && (
          <>
            <Point x={x1} y={y1} radius={pointRadius}></Point>
            <Point x={x2} y={y2} radius={pointRadius}></Point>
            <DashedLine
              x={x1}
              y={y1}
              alpha={alpha}
              dashedLength={dashedLength}
              flip={flip}
            ></DashedLine>
            <DashedLine
              x={x2}
              y={y2}
              alpha={alpha}
              dashedLength={dashedLength}
              flip={flip}
            ></DashedLine>
            <DimensionLine
              x1={x1}
              y1={y1}
              length={length}
              dashedLength={dashedLength}
              alpha={alpha}
              flip={flip}
            ></DimensionLine>
          </>
        )}
      </ContainerStyles>
    );
  }
}

Container.propTypes = {};

export default Container;
