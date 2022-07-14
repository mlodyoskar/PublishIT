const USERS_AVATARS_DIR = `${process.env.REACT_APP_SUPABASE_URL}`;

const getUserAvatarUrl = (avatarUrl: string) => {
	return `${USERS_AVATARS_DIR}/storage/v1/object/public/avatars/${avatarUrl}`;
};

export { getUserAvatarUrl };
