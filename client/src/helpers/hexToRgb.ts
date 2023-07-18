const hexToRgb = (hex: any) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m: any, r: string, g: string, b: string) => "#" + r + r + g + g + b + b,
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x: string) => parseInt(x, 16));

export default hexToRgb;
