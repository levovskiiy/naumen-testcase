export interface FormViewModel<T> {
  bindModel(value: T): void;

  getModel(): T;
}
