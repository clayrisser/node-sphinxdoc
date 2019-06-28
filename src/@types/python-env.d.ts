declare module 'python-env' {
  export function pip(args: string[]): Promise<string>;
  export function python(args: string[]): Promise<string>;
}
