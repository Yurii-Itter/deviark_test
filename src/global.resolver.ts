import { NotFoundException, ConflictException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserType } from './types/user.type';
import { GetUserArgs } from './types/args/user.args';
import { CreateUserArgs } from './types/args/create-user.args';
import { UpdateUserArgs } from './types/args/update-user.args';
import { Model } from 'mongoose';
import { UserInterface } from './schemas/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Resolver()
export class GlobalResolver {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  @Query(returns => [UserType])
  async user(@Args() { timestamp }: GetUserArgs): Promise<UserInterface[]> {
    try {
      return timestamp
        ? this.userModel.find({ createdAt: { $gte: timestamp } })
        : this.userModel.find();
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(returns => UserType)
  async createUser(
    @Args() newUser: CreateUserArgs,
  ): Promise<UserInterface | ConflictException> {
    try {
      return (await this.userModel.findOne({ email: newUser.email }))
        ? new ConflictException('email should be unique')
        : this.userModel.create({
            ...newUser,
            createdAt: Math.floor(Date.now() / 1000),
          });
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(returns => UserType)
  async updateUser(
    @Args('user_id') user_id: number,
    @Args('updates') updates: UpdateUserArgs,
  ): Promise<UserInterface | NotFoundException> {
    try {
      return (await this.userModel.findOne({ user_id }))
        ? this.userModel.findOneAndUpdate(
            { user_id },
            { ...updates, updatedAt: Math.floor(Date.now() / 1000) },
            { new: true },
          )
        : new NotFoundException(`user with ${user_id} id not found`);
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(returns => UserType)
  async deleteUser(
    @Args('user_id') user_id: number,
  ): Promise<UserInterface | NotFoundException> {
    try {
      return (await this.userModel.findOne({ user_id }))
        ? this.userModel.findOneAndDelete({ user_id })
        : new NotFoundException(`user with ${user_id} id not found`);
    } catch (error) {
      console.log(error);
    }
  }
}
