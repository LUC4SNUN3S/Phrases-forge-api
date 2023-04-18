import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { env } from '@src/config/env';
import { ApiForbidden } from '@src/core/exceptions/exceptions';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    const keyIsValid = this.isValid(apiKey);

    if (!keyIsValid) {
      throw new ApiForbidden('Chave de acesso inválida');
    }

    return keyIsValid;
  }

  isValid(apiKey: string): boolean {
    return apiKey === env.X_API_KEY;
  }
}
