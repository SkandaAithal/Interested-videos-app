import { OauthService } from 'src/auth/oauth.service';
export declare class oAuthController {
    private readonly oauthService;
    constructor(oauthService: OauthService);
    twitterLogin(): Promise<void>;
    twitterCallback(req: Request, res: Response): Promise<void>;
}
