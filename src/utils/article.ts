const USERS_ARTICLE_IMAGES_DIR = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/article-image/`;

const getArticleImageUrl = (imageUrl: string) => {
  return `${USERS_ARTICLE_IMAGES_DIR}${imageUrl}`;
};

export { getArticleImageUrl };
