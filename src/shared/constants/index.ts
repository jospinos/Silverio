// Constantes de la aplicación
export const APP_NAME = 'Silverio';
export const APP_VERSION = '1.0.0';

// API Constants
export const API_BASE_URL = 'https://api.silverio.com/v1';
export const API_TIMEOUT = 10000;

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@silverio_access_token',
  REFRESH_TOKEN: '@silverio_refresh_token',
  USER_DATA: '@silverio_user_data',
  THEME_PREFERENCE: '@silverio_theme',
  NOTIFICATION_SETTINGS: '@silverio_notifications',
} as const;

// Routes
export const ROUTES = {
  // Auth
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // Main App
  HOME: 'Home',
  SEARCH: 'Search',
  REELS: 'Reels',
  PROFILE: 'Profile',
  NOTIFICATIONS: 'Notifications',
  
  // Details
  POST_DETAIL: 'PostDetail',
  USER_PROFILE: 'UserProfile',
  CHAT: 'Chat',
  
  // Creation
  CREATE_POST: 'CreatePost',
  CREATE_STORY: 'CreateStory',
  CREATE_REEL: 'CreateReel',
  
  // Settings
  SETTINGS: 'Settings',
  PRIVACY_SETTINGS: 'PrivacySettings',
  NOTIFICATION_SETTINGS: 'NotificationSettings',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  USER_NOT_FOUND: 'User not found.',
  POST_NOT_FOUND: 'Post not found.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_ALREADY_EXISTS: 'This email is already registered.',
  USERNAME_TAKEN: 'This username is already taken.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long.',
  UPLOAD_FAILED: 'Failed to upload media. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Account created successfully!',
  POST_CREATED: 'Post created successfully!',
  POST_LIKED: 'Post liked!',
  POST_UNLIKED: 'Post unliked!',
  USER_FOLLOWED: 'User followed!',
  USER_UNFOLLOWED: 'User unfollowed!',
  MESSAGE_SENT: 'Message sent!',
  STORY_POSTED: 'Story posted!',
  REEL_POSTED: 'Reel posted!',
} as const;

// Media Constants
export const MEDIA_LIMITS = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_VIDEO_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_AUDIO_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_IMAGES_PER_POST: 10,
  MAX_VIDEO_DURATION: 300, // 5 minutes in seconds
  MAX_STORY_DURATION: 30, // 30 seconds
  MAX_REEL_DURATION: 90, // 90 seconds
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// Time Constants
export const TIME = {
  STORY_EXPIRY_HOURS: 24,
  MESSAGE_EDIT_TIME_LIMIT: 5 * 60 * 1000, // 5 minutes
  TOKEN_REFRESH_INTERVAL: 15 * 60 * 1000, // 15 minutes
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  LIKE: 'like',
  COMMENT: 'comment',
  FOLLOW: 'follow',
  MESSAGE: 'message',
  MENTION: 'mention',
  STORY_VIEW: 'story_view',
  REEL_LIKE: 'reel_like',
} as const;

// Media Types
export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  FILE: 'file',
} as const;