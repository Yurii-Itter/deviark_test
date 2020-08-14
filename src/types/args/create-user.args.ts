import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateUserArgs {
  @Field()
  fullName: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
