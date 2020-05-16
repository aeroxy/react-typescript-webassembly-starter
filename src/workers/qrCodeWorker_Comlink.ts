import { expose } from 'comlink';

expose({
  generate: ({
    href,
    width,
    height,
    qrcode
  }: any) => {
    const qr = qrcode(href, width, height);
    return {
      href,
      qr
    };
  }
});