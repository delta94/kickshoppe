/**
 * Header
 */

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Badge as AntdBadge, Icon, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { CURRENT_USER_STATE } from 'apollo/gql';
import Container from 'app/components/Container';
import styled from 'styled-components';

import LoginModal from 'app/containers/LoginModal';
import useAuthUser from 'hooks/useAuthUser';
import Spacing from 'app/components/Spacing';
import UserAvatar from 'app/containers/UserAvatar';

const HeaderContainer = styled.div`
  background: black;
  color: #ffffff;
  padding: 0.5rem 0;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.5);
`;

const HeaderContent = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

const LeftContent = styled.div`
  font-size: 24px;
`;
const RightContent = styled.div`
  display: inherit;
  align-items: center;
`;

const Badge = styled(AntdBadge)`
  &:hover {
    cursor: pointer;
  }
`;

const Link = styled.a`
  color: white;

  &:hover {
    color: ${p => p.theme.colors.link};
    cursor: pointer;
  }
`;

export const Header: React.FC = () => {
  const { logout } = useAuthUser();
  const [isOpenLoginModal, setIsOpenLoginModal] = React.useState<boolean>(false);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = React.useState<boolean>(false);
  const { data } = useQuery(CURRENT_USER_STATE);
  const isCurrentUser = data && data.user && data.user.token;

  const UserIsNotLoggedIn = () => {
    return (
      <div>
        <Link onClick={() => setIsOpenLoginModal(true)}>Login</Link> | <Link>Signup</Link>
      </div>
    );
  };

  const UserIsLoggedIn = () => {
    return (
      <Spacing display="flex" align="center">
        <Badge dot={false}>
          <Icon style={{ fontSize: '16px', paddingRight: '1rem' }} type="shopping-cart" />
        </Badge>
        <UserAvatar />
      </Spacing>
    );
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftContent>KickShoppe</LeftContent>
        <RightContent>
          <LoginModal visible={isOpenLoginModal} onClose={() => setIsOpenLoginModal(false)} />
          {isCurrentUser ? <UserIsLoggedIn /> : <UserIsNotLoggedIn />}
        </RightContent>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
