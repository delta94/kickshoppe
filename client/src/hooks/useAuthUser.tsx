import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import {
  LOCAL_STORAGE_TEMPLATE,
  //  ROUTES
} from 'enumerations';
import { SET_CURRENT_USER_TOKEN_STATE, GET_CURRENT_USER_STATE } from 'apollo/gql';

const useAuthUser = () => {
  const client = useApolloClient();
  const [setCurrentUserState] = useMutation(SET_CURRENT_USER_TOKEN_STATE);
  const history = useHistory();

  const setAuthUserToken = (token: string) => {
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_TEMPLATE.token, token);
      setCurrentUserState({
        variables: {
          token,
        },
      });
    }

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
