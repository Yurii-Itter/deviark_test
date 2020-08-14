import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserArgs {
  @Field({ nullable: true })
  fullName?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  password?: string;
}
