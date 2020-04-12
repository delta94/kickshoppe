/**
 * Header
 */

import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Badge as AntdBadge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { CURRENT_USER_STATE } from 'apollo/gql';
import {
  IS_LOGIN_MODAL_VISIBLE,
  IS_REGISTER_MODAL_VISIBLE,
  TOGGLE_LOGIN_MODAL,
  TOGGLE_REGISTER_MODAL,
} from 'apollo/gql/modals';
import Container from 'components/Container';
import LoginModal from 'containers/LoginModal';
import RegisterModal from 'containers/RegisterModal';
import Spacing from 'components/Spacing';
import UserAvatar from 'containers/UserAvatar';

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
  const { data: currentUserData } = useQuery(CURRENT_USER_STATE);
  const { data: loginModalData } = useQuery(IS_LOGIN_MODAL_VISIBLE);
  const { data: registerModalData } = useQuery(IS_REGISTER_MODAL_VISIBLE);
  const [toggleLoginModal] = useMutation(TOGGLE_LOGIN_MODAL);
  const [registerLoginModal] = useMutation(TOGGLE_REGISTER_MODAL);
  const isCurrentUser =
    !!currentUserData && !!currentUserData.user && !!currentUserData.user.accessToken;
  const isLoginModalVisible =
    loginModalData && loginModalData.loginModal && loginModalData.loginModal.visible;
  const isRegisterModalVisible =
    registerModalData && registerModalData.registerModal && registerModalData.registerModal.visible;

  const UserIsNotLoggedIn = () => {
    return (
      <div>
        <Link
          onClick={() =>
            toggleLoginModal({
              variables: {
                visible: true,
              },
            })
          }
        >
          Login
        </Link>{' '}
        |{' '}
        <Link
          onClick={() =>
            registerLoginModal({
              variables: {
                visible: true,
              },
            })
          }
        >
          Signup
        </Link>
      </div>
    );
  };

  const UserIsLoggedIn = () => {
    return (
      <Spacing display="flex" align="center">
        <Badge dot={false}>
          <ShoppingCartOutlined style={{ fontSize: '16px', paddingRight: '1rem' }} />
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
          <LoginModal
            visible={isLoginModalVisible}
            onClose={() =>
              toggleLoginModal({
                variables: {
                  visible: false,
                },
              })
            }
          />
          <RegisterModal
            visible={isRegisterModalVisible}
            onClose={() =>
              registerLoginModal({
                variables: {
                  visible: false,
                },
              })
            }
          />
          {isCurrentUser ? <UserIsLoggedIn /> : <UserIsNotLoggedIn />}
        </RightContent>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
