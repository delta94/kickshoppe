import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import {
  LocalStorage,
  //  ROUTES
} from 'enumerations';
import { SET_CURRENT_USER_TOKEN_STATE } from 'apollo/gql';

const useAuthUser = () => {
  const client = useApolloClient();
  const [setCurrentUserState] = useMutation(SET_CURRENT_USER_TOKEN_STATE);
  const history = useHistory();

  const setAuthUserToken = (accessToken: string) => {
    if (accessToken) {
      localStorage.setItem(LocalStorage.ACCESS_TOKEN, accessToken);
      setCurrentUserState({
        variables: {
          accessToken,
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
