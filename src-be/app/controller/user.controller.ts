import { Controller, Get, Route, Request } from 'tsoa';
import { Inject } from '../ioc';
import { Request as ExpressRequest } from 'express';
import { UserEntity } from '../model/user-entity';
import { UserService } from '../service/user.service';

@Route('api/user')
export class UserController extends Controller {
	@Inject() private userService!: UserService;

	@Get('')
	public async getRadar(@Request() request: ExpressRequest): Promise<UserEntity> {
		return this.userService.getUser(request.headers.authorization as string);
	}
}
