export const getQRCode = async ({
  href,
  width,
  height
}) => {
  const { qrcode } = await import('uranus-qrcode');
  return {
    href,
    qr: qrcode(href, width, height)
  };
};

export default function () { }