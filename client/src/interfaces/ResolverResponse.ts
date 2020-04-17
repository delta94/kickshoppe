import { ResolverResponseStatus } from 'enums/ResolverResponseStatus';

export interface ResolverResponse {
  data?: any;
  status: ResolverResponseStatus;
  message?: string;
}
