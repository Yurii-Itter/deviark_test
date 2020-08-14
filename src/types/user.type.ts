import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(type => Int)
  user_id: number;
  @Field()
  fullName: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(type => Int)
  createdAt: number;
  @Field(type => Int, { nullable: true })
  updatedAt: number;
}
