/**
 *
 * UserAvatar
 *
 */

import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Avatar } from 'antd';
import { GET_CURRENT_USER_IMG } from './gql';
import useAuthUser from 'hooks/useAuthUser';

const UserDropdown = styled(Dropdown)`
  &:hover {
    cursor: pointer;
  }
`;

export const UserAvatar: React.FC = () => {
  const { logout } = useAuthUser();
  const { data } = useQuery(GET_CURRENT_USER_IMG);

  const hasCurrentUserImg = data && data.userOne && data.userOne.imgUrl;

  const menu = (
    <Menu>
      <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <UserDropdown overlay={menu}>
      <Avatar icon={!hasCurrentUserImg && <UserOutlined />} src={hasCurrentUserImg} />
    </UserDropdown>
  );
};

export default UserAvatar;
