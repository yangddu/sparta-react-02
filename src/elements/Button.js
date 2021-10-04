import React from "react";
import styled from "styled-components";

const Button = (props) => {

    const {text, _onClick, is_float, margin, width} = props;

    if(is_float) {
      return (
        <React.Fragment>
          <FloatButton onClick={_onClick}>{text}</FloatButton>
        </React.Fragment>
      )
    }

    const styles = {
      margin: margin,
      width: width,
    }


    return (
      <React.Fragment>
        <ElButton {...styles} onClick={_onClick}>{text}</ElButton>
      </React.Fragment>
    );
}

Button.defaultProps = {
    text: "텍스트",
    _onClick: () => {},
    is_float: false,
    margin: false,
    width: '100%',
}

const FloatButton = styled.button`
  position: fixed;
  right: 16px;
  bottom: 50px;
  width: 50px;
  height: 50px;
  background-color: #f9e000;
  box-sizing: border-box;
  font-weight: 800;
  font-size: 36px;
  border: none;
  border-radius: 50px;
  color: #212121;
`

const ElButton = styled.button`
    width: ${(props) => props.width};
    background-color: #212121;
    color: #ffffff;
    padding: 12px 0px;
    box-sizing: border-box;
    border: none;
    ${(props) => (props.margin? `margin: ${props.margin}`: '')}
`;

export default Button;