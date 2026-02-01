export const getRenderableImageUrl = (url) => {
  if (!url) return "";

  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (match?.[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }

  return url;
};
