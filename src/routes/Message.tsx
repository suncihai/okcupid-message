import React from 'react';
import styled from 'styled-components';
import MessageList from '../components/MessageList';
import MessageChat from '../components/MessageChat';
import MessageInfo from '../components/MessageInfo';

const Wrapper = styled.div`
  width: 100%;
  height: 94vh;
`;
const Row = styled.div`
  display: flex;
  height: 100%;
`;

const Message = () => (
  <Wrapper>
    <Row>
      <MessageList />
      <MessageChat />
      <MessageInfo />
    </Row>
  </Wrapper>
);

export default Message;
