export const useSize = (width, height, zoom) => {
  return {
    width: width / zoom,
    height: height / zoom,
  };
};
