export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = reject;
  });
};

export const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = src;
    video.onloadeddata = () => resolve();
    video.onerror = reject;
  });
};

export const preloadAllAssets = async (assets: string[]) => {
  await Promise.all(assets.map((src) => (src.match(/\.(mp4|webm)$/) ? preloadVideo(src) : preloadImage(src))));
};
