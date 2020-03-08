import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Text } from '../common/Text';
import { ChatCell } from '../common/ChatCell';
import { Input } from '../common/Input';
import { IMessageItem, IChatItem } from '../reducers';
import styled from 'styled-components';
import { bitBlue, lightGray, tinyGray } from '../theme';
import { deleteMessageItem } from '../actions';
import { sendMsg } from '../actions';
import moment from 'moment';
import Cookie from 'js-cookie';
import _ from 'lodash';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  padding: 30px;
  flex-direction: column;
  flex-grow: 1;
  background: ${bitBlue};
  z-index: 0;
`;

const ChatContainer = styled.div`
  height: 85%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RowTitle = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  padding-bottom: 25px;
  border-bottom: 1px solid ${tinyGray};
`;

const Title = styled.div``;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: ${lightGray};
  position: absolute;
  cursor: pointer;
  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ChatEndRef = styled.div``;
const SendMsgBox = styled.div`
  position: absolute;
  width: calc(100% - 60px);
  bottom: 60px;
`;

const EmptyContainer = styled.div`
  height: 100%;
  position: relative;
`;

const AlignCenter = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const MessageChat = (props: StateProps & DispatchProps) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const simulateSendMsg = (
    messageId: string,
    message: string,
    interval: number
  ) => {
    setTimeout(() => {
      let messageItem: IMessageItem = null;
      if (Cookie.get('okcupidMessageItem')) {
        props.messageList.forEach(ele => {
          if (ele.messageId === Cookie.get('okcupidMessageItem')) {
            messageItem = ele;
          }
        });
      } else {
        messageItem = props.messageItem;
      }
      props.sendMsg(
        messageId,
        messageItem,
        props.messageList,
        message,
        new Date().getTime(),
        false,
        props.chatMap
      );
    }, interval * 1000);
  };

  useEffect(() => {
    simulateSendMsg('OKC004', 'I like you! Where are you?', 5); //simulate Joel will send a message to you 5s later
    simulateSendMsg('OKC005', 'Wanna have a lunch with me?', 8); //simulate Mary will send a message to you 8s later
    simulateSendMsg('OKC002', 'You seems no more interest on me, huh?', 10); //simulate Brian will send a message to you 10s later
  }, []);

  const NoContent = (
    <EmptyContainer>
      <AlignCenter>
        <Text type="title" bold>
          Please select one message item
        </Text>
      </AlignCenter>
    </EmptyContainer>
  );

  const Content = (
    <React.Fragment>
      <RowTitle>
        <Icon
          onClick={() =>
            props.deleteMessageItem(
              props.messageItem.messageId,
              props.messageList,
              props.chatMap
            )
          }
        >
          <FontAwesomeIcon icon={faTrashAlt} color="white" />
        </Icon>
        <Title>
          <Text type="title" bold>
            {props.messageItem.messagerName}
          </Text>
          <Text inline mr="5px">
            {props.messageItem.address}
          </Text>
          <Text type="blue-text" inline bold mr="2px">
            {props.messageItem.match}% Match
          </Text>
        </Title>
      </RowTitle>
      <ChatContainer>
        {props.messageChat.map((ele, index) => {
          return (
            <ChatCell
              key={index}
              isUser={ele.isUser}
              isMale={props.isMale}
              time={moment(ele.timestamp).format('hh:mm:ss a')}
            >
              {ele.message}
            </ChatCell>
          );
        })}
        <ChatEndRef ref={messagesEndRef} />
      </ChatContainer>
      <SendMsgBox>
        <Input
          append
          text="SEND"
          onClick={() => {
            props.sendMsg(
              props.messageItem.messageId,
              props.messageItem,
              props.messageList,
              input,
              new Date().getTime(),
              true,
              props.chatMap
            );
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
          }}
          onChange={e => {
            setInput(e.target.value);
          }}
        />
      </SendMsgBox>
    </React.Fragment>
  );
  return <Wrapper>{_.isEmpty(props.messageItem) ? NoContent : Content}</Wrapper>;
};

interface StateProps {
  messageItem: IMessageItem;
  messageList: Array<IMessageItem>;
  messageChat: Array<IChatItem>;
  isMale: boolean;
  chatMap: Map<string, Array<IChatItem>>;
}

interface DispatchProps {
  deleteMessageItem: (
    messageId: string,
    messageList: Array<IMessageItem>,
    chatMap: Map<string, Array<IChatItem>>
  ) => {
    type: string;
    payload_list: Array<IMessageItem>;
    payload_map: Map<string, Array<IChatItem>>;
  };
  sendMsg: (
    messageId: string,
    messageItem: IMessageItem,
    messageList: Array<IMessageItem>,
    message: string,
    timestamp: number,
    isUser: boolean,
    chatMap: Map<string, Array<IChatItem>>
  ) => {
    type: string;
    payload_map: Map<string, Array<IChatItem>>;
    payload_list: Array<IMessageItem>;
    payload_chatList: Array<IChatItem>;
  };
}

const mapStateToProps = state => ({
  messageItem: state.messageItem,
  messageList: state.messageList,
  messageChat: state.messageChat,
  isMale: state.isMale,
  chatMap: state.chatMap
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  deleteMessageItem: (
    messageId: string,
    messageList: Array<IMessageItem>,
    chatMap: Map<string, Array<IChatItem>>
  ) => dispatch(deleteMessageItem(messageId, messageList, chatMap)),
  sendMsg: (
    messageId: string,
    messageItem: IMessageItem,
    messageList: Array<IMessageItem>,
    message: string,
    timestamp: number,
    isUser: boolean,
    chatMap: Map<string, Array<IChatItem>>
  ) =>
    dispatch(
      sendMsg(
        messageId,
        messageItem,
        messageList,
        message,
        timestamp,
        isUser,
        chatMap
      )
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageChat);
