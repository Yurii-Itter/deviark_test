import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetUserArgs {
  @Field(type => Int, { nullable: true })
  timestamp?: number;
}
