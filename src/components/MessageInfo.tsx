import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IMessageItem } from '../reducers';
import { Text } from '../common/Text';
import { Button } from '../common/Button';
import { InfoCell } from '../common/InfoCell';
import { Avatar } from '../common/Avatar';
import styled from 'styled-components';
import { lightGray, bitGray } from '../theme';
import { sendWink, switchBuySell } from '../actions';
import avatar_male from '../imgs/avatar_male.png';
import avatar_female from '../imgs/avatar_female.png';
import _ from 'lodash';

const Wrapper = styled.div`
  width: 300px;
  box-shadow: -5px 0 5px -5px ${lightGray};
  padding: 30px;
  text-align: center;
  z-index: 1;
`;

const BlurArea = styled.div`
  filter: blur(${props => props.blur});
`;

const Row = styled.div`
  width: 100%;
  display: block;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
`;

const MessageInfo = (props: StateProps & DispatchProps) => {
  const isMaleIsWinked = (
    <Text mb="40px" bold>
      You said hi to {props.messageItem.messagerName}.
    </Text>
  );
  const isMaleNotWinked = (
    <Button
      type="submit"
      mb="25px"
      disabled={!props.messageItem.isAList}
      onClick={() => {
        props.sendWink(props.messageItem.messageId, props.messageList);
      }}
    >
      Send a Wink to her
    </Button>
  );
  const notMaleIsWinked = (
    <Text mb="40px" bold>
      Your Wink is sent to {props.messageItem.messagerName}
    </Text>
  );
  const notMaleNotWinked = (
    <Button
      type="submit"
      mb="25px"
      disabled={!props.messageItem.isAList}
      onClick={() => {
        props.sendWink(props.messageItem.messageId, props.messageList);
      }}
    >
      Wink to him
    </Button>
  );

  return (
    <Wrapper>
      <BlurArea blur={_.isEmpty(props.messageItem) ? '5px' : '0'}>
        <Row>
          <Text>{`You are chating with ${props.messageItem.messagerName}`}</Text>
          {/* hard code time here */}
          <Text type="sub-text" mb="30px">
            Started 23 minutes ago
          </Text>
          {props.isMale
            ? props.messageItem.isWinked
              ? isMaleIsWinked
              : isMaleNotWinked
            : props.messageItem.isWinked
            ? notMaleIsWinked
            : notMaleNotWinked}
        </Row>
        <Flex>
          <InfoCell rb="1px" bb="1px">
            <Avatar
              src={props.isMale ? avatar_female : avatar_male}
              mb="2px"
            />
            <Row>
              <Text type="blue-text" inline bold>
                {props.messageItem.match}% Match
              </Text>
            </Row>
          </InfoCell>
          <InfoCell bb="1px">
            <Text uppercase bold>
              Rank in search
            </Text>
            <Text>{props.messageItem.messages}</Text>
          </InfoCell>
        </Flex>
        <Flex>
          <InfoCell rb="1px" bb="1px">
            <Text uppercase bold>
              User Status
            </Text>
            <Text
              type={props.messageItem.isAList ? 'green-text' : 'sub-text'}
              bold
            >
              {props.messageItem.isAList ? 'A-LIST' : 'SILVER'}
            </Text>
          </InfoCell>
          <InfoCell bb="1px">
            <Text uppercase bold>
              Race
            </Text>
            <Text type="sub-text">{props.messageItem.race}</Text>
          </InfoCell>
        </Flex>
        <Flex>
          <InfoCell rb="1px" bb="1px">
            <Text uppercase bold>
              Age
            </Text>
            <Text>{props.messageItem.age}</Text>
          </InfoCell>
          <InfoCell bb="1px">
            <Text uppercase bold>
              Hobby
            </Text>
            <Text type="sub-text">{props.messageItem.hobby}</Text>
          </InfoCell>
        </Flex>
      </BlurArea>
      <Row>
        <Button
          type="primary"
          mt="80px"
          mb="10px"
          onClick={() => {
            props.switchBuySell(props.isMale, props.messageList);
          }}
        >
          {props.isMale ? 'Looking for Men' : 'Looking for Women'}
        </Button>
        <Row>
          <Text inline mr="5px">
            I am a
          </Text>
          <Text inline bold>
            {props.isMale ? 'Man' : 'Woman'}
          </Text>
        </Row>
      </Row>
    </Wrapper>
  );
};

interface StateProps {
  messageList: Array<IMessageItem>;
  messageItem: IMessageItem;
  isMale: boolean;
}

interface DispatchProps {
  sendWink: (
    messageId: string,
    messageList: Array<IMessageItem>
  ) => {
    type: string;
    payload_list: Array<IMessageItem>;
    payload_item: object;
  };
  switchBuySell: (
    isMale: boolean,
    messageList: Array<IMessageItem>
  ) => {
    type: string;
    payload: boolean;
  };
}

const mapStateToProps = state => ({
  messageList: state.messageList,
  messageItem: state.messageItem,
  isMale: state.isMale
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  sendWink: (messageId: string, messageList: Array<IMessageItem>) =>
    dispatch(sendWink(messageId, messageList)),
  switchBuySell: (isMale: boolean, messageList: Array<IMessageItem>) =>
    dispatch(switchBuySell(isMale, messageList))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageInfo);
