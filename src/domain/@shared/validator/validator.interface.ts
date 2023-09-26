export interface ValidatorInterface<T> {
  validator(entity: T): void
}