import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'atomicuilibrary/loader' {
  export function defineCustomElements(win?: any, opts?: any): Promise<void>;
}
