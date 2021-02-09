import { Controller, Get, Route, Request, Res, TsoaResponse } from 'tsoa';
import { Inject } from '../ioc';
import { Request as ExpressRequest } from 'express';
import { UserEntity } from '../model/user-entity';
import { UserService } from '../service/user.service';

// tslint:disable: no-magic-numbers

@Route('api/user')
export class UserController extends Controller {
	@Inject() private userService!: UserService;

	@Get('')
	public async getRadar(
		@Request() request: ExpressRequest,
		@Res() errorResponse: TsoaResponse<401, { reason: string }>
	): Promise<UserEntity> {
		try {
			const user: UserEntity = await this.userService.getUser(request.headers.authorization as string);
			return Promise.resolve(user);
		} catch (err) {
			errorResponse(401, { reason: 'Unauthorized' });
		}

		return Promise.reject(undefined);
	}
}
