export interface UseCase<T> {
  execute(...params: unknown[]): T;
}
