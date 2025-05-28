
export class Result<T> {

    private value: T
    private error: Error
    private isError: boolean
  
    private constructor(
        isError: boolean,
        value?: T, 
        error?: Error) {
      this.value = value!
      this.error = error!
      this.isError = isError
    }
  
    public IsError(): boolean {
      return this.isError
    }
  
    getValue(): T {
      if (this.IsError()) throw new Error('No hay un valor, ocurrio un Error')
      return this.value
    }
  
    getError(): Error {
      if (!this.IsError()) throw new Error('No hay error, se obtuvo un Valor')
      return this.error
    }
  
    static success<T>(value: T) {
      return new Result<T>(false, value)
    }
  
    static fail<T>(error: Error) {
      return new Result<T>(true, undefined, error)
    }
  }