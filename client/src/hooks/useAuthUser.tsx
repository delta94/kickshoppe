import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { LOCAL_STORAGE_TEMPLATE, ROUTES } from 'enumerations';
import { SET_CURRENT_USER_TOKEN_STATE } from 'apollo/state/gql';

const useAuthUser = () => {
  const client = useApolloClient();
  const [setCurrentUserState] = useMutation(SET_CURRENT_USER_TOKEN_STATE);
  const history = useHistory();

  const setAuthUserToken = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_TEMPLATE.token, token);
    setCurrentUserState({
      variables: {
        token,
      },
    });
    // history.push(ROUTES.dashboard);
  };

  const logout = () => {
    client.resetStore();
    localStorage.clear();
    history.push('/');
  };

  return { logout, setAuthUserToken };
};

export default useAuthUser;
