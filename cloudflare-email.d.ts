// Type declaration for the Cloudflare Workers runtime email module.
// `cloudflare:email` only exists at runtime inside the Worker; TypeScript
// needs this declaration so `next build`'s type-check step passes.
declare module 'cloudflare:email' {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string);
    readonly from: string;
    readonly to: string;
    readonly raw: string;
  }
}
