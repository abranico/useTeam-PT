import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from 'src/application/dto/user-payload.dto';

export const User = createParamDecorator(
  (data: keyof UserPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) return null;
    return data ? request.user[data] : request.user;
  },
);
