import { ExecutionContext } from '@nestjs/common';
declare const TwitterGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class TwitterGuard extends TwitterGuard_base {
    CanActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
