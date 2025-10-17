// Entidad User del dominio
export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Entidad Post del dominio  
export interface Post {
  id: string;
  authorId: string;
  author: User;
  content: string;
  images?: string[];
  video?: string;
  audio?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Entidad Message del dominio
export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  sender: User;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  mediaUrl?: string;
  isRead: boolean;
  createdAt: Date;
}

// Entidad Chat del dominio
export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isGroup: boolean;
  groupName?: string;
  groupImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Entidad Story del dominio
export interface Story {
  id: string;
  authorId: string;
  author: User;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption?: string;
  viewsCount: number;
  isViewed: boolean;
  expiresAt: Date;
  createdAt: Date;
}

// Entidad Reel del dominio
export interface Reel {
  id: string;
  authorId: string;
  author: User;
  videoUrl: string;
  thumbnailUrl: string;
  caption?: string;
  musicId?: string;
  music?: Music;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  isLiked: boolean;
  duration: number;
  createdAt: Date;
}

// Entidad Music del dominio
export interface Music {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl?: string;
  duration: number;
  genre?: string;
}

// Entidad Notification del dominio
export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'message' | 'mention';
  title: string;
  message: string;
  isRead: boolean;
  actionUserId?: string;
  actionUser?: User;
  relatedPostId?: string;
  relatedPost?: Post;
  createdAt: Date;
}