/**
 *
 * GoogleAuthButton
 *
 */

import React from 'react';
import { Button, message as antdMessage } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/react-hooks';
import { GOOGLE_AUTH } from './gql';
import { GOOGLE_CLIENT_ID } from 'constants/index';
import { GET_CURRENT_USER_STATE } from 'apollo/gql';
import useAuthUser from 'hooks/useAuthUser';
import styled from 'styled-components';

const GoogleButton = styled(Button)`
  && {
    background-color: ${p => p.theme.colors.google};
    border-color: ${p => p.theme.colors.google};

    :active {
      background-color: ${p => p.theme.colors.google};
      border-color: ${p => p.theme.colors.google};
    }

    :hover {
      background-color: ${p => p.theme.colors.google};
      border-color: ${p => p.theme.colors.google};
    }
  }
`;

interface IGoogleAuthButton {
  onSuccess?: ({ accessToken, ok }: { accessToken: string; ok: boolean }) => void;
}

export const GoogleAuthButton: React.FC<IGoogleAuthButton &
  React.HTMLAttributes<HTMLDivElement>> = ({ style, className, children, onSuccess }) => {
  const { setAuthUserToken } = useAuthUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const [googleAuth, { error, data }] = useMutation(GOOGLE_AUTH, {
    refetchQueries: [{ query: GET_CURRENT_USER_STATE }],
  });

  React.useEffect(() => {
    if (data && data.googleAuth && data.googleAuth.accessToken) {
      setIsLoading(false);
      setAuthUserToken(data.googleAuth.accessToken);
    }
  }, [data]);

  React.useEffect(() => {
    if (error) {
      antdMessage.error(error.message);
      setIsLoading(false);
    }
  }, [error]);

  const handleOnSuccess = async (response: any) => {
    const accessToken: string = (response && response.accessToken) || '';

    if (accessToken) {
      googleAuth({
        variables: {
          accessToken,
        },
      });

      if (onSuccess) {
        onSuccess({ accessToken, ok: true });
      }
    }
  };

  const handleOnFailure = (response: any) => {
    console.log('handleOnFailure', response);
  };

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      onSuccess={handleOnSuccess}
      onFailure={handleOnFailure}
      onRequest={() => setIsLoading(true)}
      cookiePolicy={'single_host_origin'}
      render={renderProps => (
        <GoogleButton
          style={style}
          className={className}
          icon={<GoogleOutlined />}
          block
          type="danger"
          onClick={renderProps.onClick}
          loading={isLoading}
        >
          {children}
        </GoogleButton>
      )}
    />
  );
};

export default GoogleAuthButton;
