/**
 *
 * LoginModal
 *
 */

import React from 'react';
// import { useApolloClient } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { Input, Button, message as antdMessage, Modal } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { validationSchema } from './validations';
import { fieldNames } from './enumerations';
import { LOGIN } from './gql';
import { Subtitle } from 'app/components/Typography';
import ErrorMessage from 'app/components/ErrorMessage';
import Spacing from 'app/components/Spacing';
import useAuthUser from 'hooks/useAuthUser';
import GoogleAuthButton from 'app/containers/GoogleAuthButton';
import FacebookAuthButton from 'app/containers/FacebookAuthButton';

interface ILoginModal {
  onClose: () => void;
  visible: boolean;
}

export const LoginModal: React.FC<ILoginModal> = ({ visible = false, onClose }) => {
  // const client = useApolloClient();
  const { setAuthUserToken: setAuthUser } = useAuthUser();
  const { handleSubmit, errors, control, reset } = useForm({
    validationSchema,
    mode: 'onChange',
  });
  const [login, { loading: isLogining, error, data: loginData }] = useMutation(LOGIN);

  const onFormSubmit = async (values: any) => {
    const { userName, password } = values;
    const response = await login({
      variables: {
        username: userName,
        password,
      },
    });
    if (response) {
      const token = response && response.data && response.data.login && response.data.login.token;
      if (token) {
        setAuthUser(token);
      }
    }
  };

  const handleOnClose = () => {
    reset();
    onClose();
  };

  const handleGoogleOnSuccess = ({ ok }: { ok: boolean }) => {
    if (ok) {
      onClose();
    }
  };

  const handleFbOnSuccess = ({ ok }: { ok: boolean }) => {
    if (ok) {
      onClose();
    }
  };

  return (
    <Modal
      footer={null}
      centered
      title="Log in to your account"
      visible={visible}
      onCancel={handleOnClose}
    >
      <Spacing>
        <form>
          <Spacing margin="0 0 16px 0">
            <Subtitle>
              Continue Log in to your account, so you can continue building cool stuff!
            </Subtitle>
          </Spacing>
          <Spacing margin="0 0 8px 0">
            <Controller
              name={fieldNames.userName}
              control={control}
              placeholder="Username"
              as={Input}
            />
            <ErrorMessage errors={errors} name={fieldNames.userName} />
          </Spacing>
          <Spacing margin="0 0 8px 0">
            <Controller
              name={fieldNames.password}
              type="password"
              placeholder="Password"
              control={control}
              as={Input}
            />
            <ErrorMessage errors={errors} name={fieldNames.password} />
          </Spacing>
          <Spacing margin="0 0 8px 0">
            <Button
              block
              onClick={handleSubmit(onFormSubmit)}
              type="primary"
              htmlType="submit"
              loading={isLogining}
            >
              Log in
            </Button>
          </Spacing>
        </form>
        <Spacing display="flex" justify="center" margin="8px auto">
          or
        </Spacing>
        <Spacing display="flex" justify="space-between" margin="8px 0 0">
          <GoogleAuthButton onSuccess={handleGoogleOnSuccess}>Login with Google</GoogleAuthButton>
          <FacebookAuthButton onSuccess={handleFbOnSuccess}>Login with Facebook</FacebookAuthButton>
        </Spacing>
      </Spacing>
    </Modal>
  );
};

export default LoginModal;
