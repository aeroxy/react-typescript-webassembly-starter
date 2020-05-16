import { expose } from 'comlink';

expose({
  generate: async ({
    href,
    width,
    height
  }: any) => {
    const { qrcode } = await import('uranus-qrcode');
    return {
      href,
      qr: qrcode(href, width, height)
    };
  }
});