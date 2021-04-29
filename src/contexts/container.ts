import 'contexts/register';
import { container, InjectionToken } from 'tsyringe';

export class Container {
  static resolve<T>(token: InjectionToken<T>): T {
    try {
      return container.resolve(token);
    } catch (e) {
      Error.captureStackTrace(e, Container.resolve);
      throw e;
    }
  }
}
