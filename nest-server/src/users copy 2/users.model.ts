import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GoogleAccount {
  @Field({ nullable: true })
  accessToken?: string;
}

@ObjectType()
export class FacebookAccount {
  @Field()
  accessToken: string;
}

@ObjectType()
export class UsersModel {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  imgUrl: string;

  @Field({ nullable: true })
  googleAccount: GoogleAccount;

  @Field({ nullable: true })
  facebookAcount: FacebookAccount;
}
