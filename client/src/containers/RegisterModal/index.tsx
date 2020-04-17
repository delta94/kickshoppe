/**
 *
 * RegisterModal
 *
 */

import React from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useDebouncedCallback } from 'use-debounce';
import { Input, Button, message as antdMessage, Modal } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { TOGGLE_LOGIN_MODAL } from 'apollo/gql/modals';
import Message from 'components/Message';
import ErrorMessage from 'components/ErrorMessage';
import Spacing from 'components/Spacing';
import useAuthUser from 'hooks/useAuthUser';
import GoogleAuthButton from 'containers/GoogleAuthButton';
import FacebookAuthButton from 'containers/FacebookAuthButton';
import { REGISTER_USER, USER_NAME_AUTOCOMPLETE } from './gql';
import { fieldNames } from './enums';
import { validationSchema } from './validations';

const { Search } = Input;

interface IRegisterModal {
  onClose: () => void;
  visible: boolean;
}

export const RegisterModal: React.FC<IRegisterModal> = ({ visible = false, onClose }) => {
  const [toggleLoginModal] = useMutation(TOGGLE_LOGIN_MODAL);
  const { setAuthUserToken: setAuthUser } = useAuthUser();
  const [userNameIsAvailable, setUserNameIsAvailable] = React.useState<boolean>(false);
  const [autoComplete, { data: autoCompleteData, loading: isAutoCompleting }] = useLazyQuery(
    USER_NAME_AUTOCOMPLETE
  );

  const [registerUser, { loading: isRegistering, error }] = useMutation(REGISTER_USER);
  const { control, handleSubmit, errors, watch } = useForm({
    validationSchema,
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });
  const [debouncedCallback] = useDebouncedCallback((username: string) => {
    autoComplete({
      variables: {
        username,
      },
    });
  }, 1000);
  const userNameValue = watch(fieldNames.userName);

  React.useEffect(() => {
    if (userNameValue) {
      debouncedCallback(userNameValue);
    }
  }, [userNameValue]);

  React.useEffect(() => {
    if (autoCompleteData) {
      const { userNameAutoComplete } = autoCompleteData;
      const ok: boolean = userNameAutoComplete && userNameAutoComplete.ok;
      setUserNameIsAvailable(ok);
    }
  }, [autoCompleteData]);

  React.useEffect(() => {
    if (error) {
      antdMessage.error(error.message);
    }
  }, [error]);

  const onFormSubmit = async (values: any) => {
    const { userName, password } = values;
    const response = await registerUser({
      variables: {
        username: userName,
        password,
      },
    });
    if (response) {
      const accessToken =
        response && response.data && response.data.login && response.data.login.accessToken;
      if (accessToken) {
        setAuthUser(accessToken);
        antdMessage.success('You have successfully create an account! Start with login in');
        onClose();
      }
    }
  };

  const handleOnClose = () => {
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

  const handleRedirectModal = () => {
    onClose();
    toggleLoginModal({ variables: { visible: true } });
  };

  const UserNameAvailability = () => {
    return (
      <>
        {userNameIsAvailable ? (
          <Message color="success">
            <span role="img" aria-label="success">
              ✅ User name is available!
            </span>
          </Message>
        ) : (
          <Message color="error">
            <span role="img" aria-label="error">
              ❌ User name is already in use!
            </span>
          </Message>
        )}
      </>
    );
  };

  return (
    <Modal
      zIndex={1001}
      footer={null}
      centered
      title="Sign up for an Account"
      visible={visible}
      onCancel={handleOnClose}
    >
      <Spacing>
        <form>
          <Spacing margin="0 0 16px 0">
            <Controller
              name={fieldNames.userName}
              control={control}
              placeholder="Username"
              as={<Search loading={isAutoCompleting} enterButton />}
            />

            {autoCompleteData ? <UserNameAvailability /> : null}
            <ErrorMessage errors={errors} name={fieldNames.userName} />
          </Spacing>
          <Spacing margin="0 0 16px 0">
            <Controller name={fieldNames.email} control={control} placeholder="Email" as={Input} />
            <ErrorMessage errors={errors} name={fieldNames.email} />
          </Spacing>
          <Spacing margin="0 0 16px 0">
            <Controller
              type="password"
              name={fieldNames.password}
              control={control}
              placeholder="Password"
              as={Input}
            />
            <ErrorMessage errors={errors} name={fieldNames.password} />
          </Spacing>
          <Spacing margin="0 0 16px 0">
            <Controller
              type="password"
              name={fieldNames.confirmPassword}
              control={control}
              placeholder="Confirm Password"
              as={Input}
            />
            <ErrorMessage errors={errors} name={fieldNames.confirmPassword} />
          </Spacing>
          <Spacing margin="0 0 8px 0">
            Already a user? <a onClick={handleRedirectModal}>Log in</a> instead.
          </Spacing>
          <Spacing margin="0 0 8px 0">
            <Button
              block
              onClick={handleSubmit(onFormSubmit)}
              type="primary"
              htmlType="submit"
              loading={isRegistering}
            >
              Register
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

export default RegisterModal;
