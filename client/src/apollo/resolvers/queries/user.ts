import { ResolverMap } from 'interfaces/ResolverMap';
import { ResolverResponseStatus } from 'enums/ResolverResponseStatus';
import { GET_CURRENT_USER_STATE } from 'apollo/gql/user';

const userQuery: ResolverMap = {
  getCurrentUserState: async (root, args, { cache }) => {
    try {
      const data: any = cache.readQuery({
        query: GET_CURRENT_USER_STATE,
      });
      const user = data && data.user;
      return {
        data: user,
        status: ResolverResponseStatus.Success,
      };
    } catch (error) {
      return {
        status: ResolverResponseStatus.Failure,
        message: error.message,
      };
    }
  },
};

export default userQuery;
