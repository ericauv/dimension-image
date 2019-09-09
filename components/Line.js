import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'


    const LineStyles = styled.div`
        border: 1px solid black;
        width: ${length}px;
    height: 0px;
    transform: rotate(`${props=>props.args.angle}rad`);
    -moz-transform: rotate(`${props=>props.args.angle}rad`);
    -webkit-transform: rotate(`${props=>props.args.angle}rad`);
    -o-transform: rotate(`${props=>props.args.angle}rad`);
    -ms-transform: rotate(`${props=>props.args.angle}rad`);
    position: absolute;
    top: ${props=>props.args.y}px;
    left: ${props=>props.args.x}px;
    `;
class Line extends Component {

    // Calculate arguments needed to style line
    getLineStylesArgs= (x1, y1, x2, y2)=> {
        const a = x1 - x2,
            b = y1 - y2,
            c = Math.sqrt(a * a + b * b);

        const sx = (x1 + x2) / 2,
            sy = (y1 + y2) / 2;

        const x = sx - c / 2,
            y = sy;

        const angle = Math.PI - Math.atan2(-b, a);

        return {x, y, length:c, angle:alpha};
    }
    render() {
    const {x1,x2,y1,y2} = this.props;
    return <LineStyles args={this.getLineStylesArgs(x1,y1,x2,y2)}></LineStyles>;
  }
}

Line.propTypes = {
  x1: PropTypes.number,
  x2: PropTypes.number,
  y1: PropTypes.number,
  y2: PropTypes.number
};

export default Line;
