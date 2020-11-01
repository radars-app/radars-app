import express, { Request, Response } from 'express';
import authConfig from '../auth-config.json';
import passport from 'passport';
import { BearerStrategy, IBearerStrategyOption, IBearerStrategyOptionWithRequest, ITokenPayload } from 'passport-azure-ad';

const securedRoutes: string[] = ['/sample'];

const options: IBearerStrategyOptionWithRequest = {
	identityMetadata: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}/${authConfig.metadata.discovery}`,
	issuer: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}`,
	clientID: authConfig.credentials.clientID,
	audience: authConfig.credentials.audience,
	validateIssuer: authConfig.settings.validateIssuer,
	passReqToCallback: authConfig.settings.passReqToCallback,
	loggingLevel: authConfig.settings.loggingLevel as any
};

const bearerStrategy: BearerStrategy = new BearerStrategy(options as IBearerStrategyOption, (token: ITokenPayload, done: Function) => {
	done(null, {}, token);
});

export function setupAuthenticationMiddleware(app: express.Router): void {
	app.use(passport.initialize());

	passport.use(bearerStrategy);

	app.use((request: Request, response: Response, next: Function) => {
		const isSecureRoute: boolean = securedRoutes.some((secureRoutePath: string) => request.path.includes(secureRoutePath));
		if (isSecureRoute) {
			passport.authenticate('oauth-bearer', {session: false})(request, response, next);
		} else {
			next();
		}
	});
}
