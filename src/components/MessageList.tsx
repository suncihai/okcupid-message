import React from 'react';
import { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IMessageItem } from '../reducers';
import MessageItem from './MessageItem';
import styled from 'styled-components';
import { lightGray } from '../theme';
import { selectMessageItem, getInitialItem } from '../actions';
import Cookie from 'js-cookie';
import { history } from '../index';

const Wrapper = styled.div`
  width: 300px;
  box-shadow: 5px 0 5px -5px ${lightGray};
  z-index: 1;
`;

const MessageList = (props: StateProps & DispatchProps) => {
  useEffect(() => {
    props.getInitialItem(props.messageList);
    let messageId = Cookie.get('okcupidMessageItem');
    history.push(`/message/${props.isMale ? 'women' : 'men'}/${messageId}`);
  }, []);

  return (
    <Wrapper>
      {props.messageList
        .filter(item => item.isMale !== props.isMale)
        .map((ele, index) => {
          return (
            <MessageItem
              onClick={() =>
                props.selectMessageItem(
                  ele.messageId,
                  props.isMale,
                  props.messageList
                )
              }
              item={ele}
              key={index}
            />
          );
        })}
    </Wrapper>
  );
};

interface StateProps {
  messageList: Array<IMessageItem>;
  isMale: boolean;
}

interface DispatchProps {
  selectMessageItem: (
    messageId: string,
    isMale: boolean,
    messageList: Array<IMessageItem>
  ) => {
    type: string;
    payload_list: Array<IMessageItem>;
    payload_item: object;
  };
  getInitialItem: (
    messageList: Array<IMessageItem>
  ) => {
    type: string;
    payload_list: Array<IMessageItem>;
    payload_item: object;
  };
}

const mapStateToProps = state => ({
  messageList: state.messageList,
  isMale: state.isMale
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  selectMessageItem: (
    messageId: string,
    isMale: boolean,
    messageList: Array<IMessageItem>
  ) => dispatch(selectMessageItem(messageId, isMale, messageList)),
  getInitialItem: (messageList: Array<IMessageItem>) =>
    dispatch(getInitialItem(messageList))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
