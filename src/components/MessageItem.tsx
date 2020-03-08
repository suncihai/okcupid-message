import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IMessageItem } from '../reducers';
import {
  green,
  bitBlue,
  bitGray,
  lightGray,
  darkGray,
  tinyGray
} from '../theme';
import styled from 'styled-components';
import { Text } from '../common/Text';
import { Avatar } from '../common/Avatar';
import _ from 'lodash';
import avatar_male from '../imgs/avatar_male.png';
import avatar_female from '../imgs/avatar_female.png';

const Wrapper = styled.div`
  padding: 20px;
  border-left: 1px solid ${bitGray};
  border-bottom: 1px solid ${bitGray};
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  &.isActive {
    background: ${bitBlue};
    width: 310px;
    padding-left: 10px;
    border: 2px solid ${lightGray};
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    transition: all 0.3s ease;
  }
`;

const Slider = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftPart = styled.div`
  display: flex;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin-right: 8px;
  margin-top: 4px;
  background: ${green};
  &.isRead {
    background: ${lightGray};
  }
  &.isActive {
    background: ${tinyGray};
  }
`;

const TextBox = styled.div``;
const RightPart = styled.div`
  width: 50px;
  text-align: center;
  padding-top: 3px;
`;

const MessageItem = (props: StateProps & OwnProps & DispatchProps) => (
  <Wrapper
    onClick={props.onClick}
    className={props.item.isActive ? 'isActive' : ''}
  >
    <Slider>
      <LeftPart>
        <Dot
          className={_.compact([
            props.item.isRead && 'isRead',
            props.item.isActive && 'isActive'
          ]).join(' ')}
        />
        <TextBox>
          <Text type="sub-text" mb="4px">{props.item.address}</Text>
          <Text bold mb="2px">
            {props.item.messagerName}
          </Text>
          <Text
            type="sub-text"
            nowrap
          >{`Age ${props.item.age}, likes ${props.item.hobby}`}</Text>
        </TextBox>
      </LeftPart>
      <RightPart>
        <Avatar
          src={props.item.avatar === 'male' ? avatar_male : avatar_female}
          mb="5px"
        />
        <Text type={props.item.isAList ? 'green-text' : 'sub-text'} bold nowrap>
          {props.item.isAList ? 'A-LIST' : 'SILVER'}
        </Text>
      </RightPart>
    </Slider>
  </Wrapper>
);

interface StateProps {
  isMale: boolean;
}

interface OwnProps {
  onClick: () => void;
  item: IMessageItem;
  isMale: boolean;
}

const mapStateToProps = state => ({
  isMale: state.isMale
});

interface DispatchProps {}

const mapDispatchToProps = (dispatch: Dispatch<IMessageItem>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MessageItem);
