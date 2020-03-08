import React, { ReactDOM } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import { bitGray, darkBlue, lightGray } from '../theme';
import logo from '../imgs/okcupid_logo.png';

const NavWrapper = styled.div`
  background: ${darkBlue};
  color: ${lightGray};
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    margin-left: 10px;
    height: 40px;
  }
`;

const NaviUl = styled.ul`
  display: flex;
`;

const NaviLi = styled.li`
  list-style-type: none;
  margin-right: 25px;
  a {
    color: ${bitGray};
    text-decoration: none;
  }
  &.active a {
    text-decoration: underline;
  }
`;

interface INavi {
  path: string;
  label: string;
  active: boolean;
}

const NaviList: Array<INavi> = [
  { path: '/double-take', label: 'DoubleTake', active: false },
  { path: '/', label: 'Messages', active: true }, //default as Messages
  { path: '/discover', label: 'Discover', active: false },
  { path: '/search', label: 'Search', active: false },
  { path: '/likes', label: 'Likes', active: false }
];

//just for display UI, not real link
const NavBar = () => (
  <NavWrapper>
    <img src={logo} />
    <NaviUl>
      {NaviList.map((ele, index) => {
        return (
          <NaviLi key={index} className={ele.active ? 'active' : ''}>
            {/* below comment would be real case */}
            {/* <BrowserRouter>
              <Link to={ele.path}>{ele.label}</Link>
            </BrowserRouter> */}
            <a>{ele.label}</a>
          </NaviLi>
        );
      })}
    </NaviUl>
  </NavWrapper>
);

export default NavBar;
