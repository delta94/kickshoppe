import mongoose, { Schema, Document } from 'mongoose';

interface ContextProps {}

//TODO: add interface here

export type ResolverFn = (parent: any, args: any, ctx: any, info: any) => Promise<any>;

export interface IResolverMap {
  [field: string]: ResolverFn;
}
