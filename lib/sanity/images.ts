import { sanityClient, urlFor } from './client';

export const uploadImageToSanity = async (imageUri: string): Promise<any> => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const asset = await sanityClient.assets.upload("image", blob, {
      filename: `journal-image-${Date.now()}.jpg`,
    });

    return asset;
  } catch (error) {
    console.error("Error uploading image to Sanity:", error);
    throw error;
  }
};

export const getImageUrl = (asset: any, width = 800) => {
  if (!asset) return null;
  return urlFor(asset).width(width).auto("format").url();
};

export const getResponsiveImageUrls = (asset: any) => {
  if (!asset) return null;
  
  return {
    small: urlFor(asset).width(400).auto("format").url(),
    medium: urlFor(asset).width(800).auto("format").url(),
    large: urlFor(asset).width(1200).auto("format").url(),
    thumbnail: urlFor(asset).width(200).height(200).fit("crop").auto("format").url(),
  };
};

export const getJournalImageUrl = (asset: any, options?: {
  width?: number;
  height?: number;
  quality?: number;
}) => {
  if (!asset) return null;
  
  const { width = 800, height = 400, quality = 80 } = options || {};
  
  return urlFor(asset)
    .width(width)
    .height(height)
    .fit("crop")
    .quality(quality)
    .auto("format")
    .url();
};