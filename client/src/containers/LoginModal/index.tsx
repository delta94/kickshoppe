/**
 *
 * LoginModal
 *
 */

import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Input, Button, message as antdMessage, Modal } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { validationSchema } from './validations';
import { fieldNames } from './enums';
import { LOGIN } from './gql';
import { TOGGLE_REGISTER_MODAL } from 'apollo/gql/modals';
import ErrorMessage from 'components/ErrorMessage';
import Spacing from 'components/Spacing';
import useAuthUser from 'hooks/useAuthUser';
import GoogleAuthButton from 'containers/GoogleAuthButton';
import FacebookAuthButton from 'containers/FacebookAuthButton';

interface ILoginModal {
  onClose: () => void;
  visible: boolean;
}

export const LoginModal: React.FC<ILoginModal> = ({ visible = false, onClose }) => {
  const [registerLoginModal] = useMutation(TOGGLE_REGISTER_MODAL);
  const { setAuthUserToken: setAuthUser } = useAuthUser();
  const { handleSubmit, errors, control } = useForm({
    validationSchema,
    mode: 'onChange',
  });
  const [login, { loading: isLogining, error }] = useMutation(LOGIN);

  React.useEffect(() => {
    if (error) {
      antdMessage.error(error.message);
    }
  }, [error]);

  const onFormSubmit = async (values: any) => {
    const { userName, password } = values;
    const response = await login({
      variables: {
        username: userName,
        password,
      },
    });
    if (response) {
      const accessToken =
        response && response.data && response.data.accessToken && response.data.login.accessToken;
      if (accessToken) {
        setAuthUser(accessToken);
        antdMessage.success('Log in succesfull!');
        onClose();
      }
    }
  };

  const handleOnClose = () => {
    onClose();
  };

  const handleGoogleOnSuccess = ({ ok }: { ok: boolean }) => {
    if (ok) {
      antdMessage.success('Log in succesfull!');
      onClose();
    }
  };

  const handleFbOnSuccess = ({ ok }: { ok: boolean }) => {
    if (ok) {
      antdMessage.success('Log in succesfull!');
      onClose();
    }
  };

  const handleRedirectModal = () => {
    onClose();
    registerLoginModal({ variables: { visible: true } });
  };

  return (
    <Modal
      footer={null}
      centered
      title="Log in to your account"
      visible={visible}
      onCancel={handleOnClose}
      zIndex={1001}
    >
      <Spacing>
        <form>
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
            Not a user? Please <a onClick={handleRedirectModal}>register</a>.
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
          <Spacing width="100%" padding="0 8px 0 0">
            <GoogleAuthButton onSuccess={handleGoogleOnSuccess}>Login with Google</GoogleAuthButton>
          </Spacing>
          <Spacing width="100%" padding="0 0 0 8px">
            <FacebookAuthButton onSuccess={handleFbOnSuccess}>
              Login with Facebook
            </FacebookAuthButton>
          </Spacing>
        </Spacing>
      </Spacing>
    </Modal>
  );
};

export default LoginModal;
