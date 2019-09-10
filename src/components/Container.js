import React, { Component } from 'react';
import styled from 'styled-components';
import DashedLine from './DashedLine';
import DimensionLine from './DimensionLine';
import Point from './Point';

const ContainerStyles = styled.div`
  position: absolute;
  width: 1000px;
  height: 1000px;
  &:hover {
    cursor: pointer;
  }
  background-image: url('https://mcnairshirts.com/wp-content/uploads/2019/03/mcnair-mens-plasmadry-olive-force-shirt-1500sq.jpg');
  background-size: contain;
`;

class Container extends Component {
  handleClick = e => {
    const pointsSet = [...this.state.pointsSet];
    e.persist();
    console.log(e);

    if (!pointsSet[0]) {
      pointsSet[0] = true;
      pointsSet[1] = false;
      const x1 = e.pageX;
      const y1 = e.pageY;
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
      const x2 = e.pageX;
      const y2 = e.pageY;
      this.setState({ pointsSet, x2, y2 });
    }
  };
  handleChange = ({ currentTarget: { value, name, type } }) => {
    let val = value;
    let flip = false;
    if (type === 'number') {
      val = parseFloat(val) || 0;
    }
    if (name === 'dashedLength') {
      flip = val < 0;
      val = Math.abs(val);
    }
    this.setState({ [name]: val, flip });
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
    flip: false,
    offset: 23
  };
  render() {
    const {
      x1,
      y1,
      x2,
      y2,
      pointRadius,
      dashedLength,
      flip,
      offset
    } = this.state;
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
          <label>Text Offset</label>
          <input
            onClick={e => e.stopPropagation()}
            onChange={this.handleChange}
            defaultValue={this.state.offset}
            name="offset"
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
              offset={offset}
              text={'10px'}
            ></DimensionLine>
          </>
        )}
      </ContainerStyles>
    );
  }
}

export default Container;
