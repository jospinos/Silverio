import { User, Post, Message, Chat, Story, Reel, Notification } from '../entities';

// Repository interface para User
export interface UserRepository {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  searchUsers(query: string): Promise<User[]>;
  followUser(userId: string, targetUserId: string): Promise<void>;
  unfollowUser(userId: string, targetUserId: string): Promise<void>;
  getFollowers(userId: string): Promise<User[]>;
  getFollowing(userId: string): Promise<User[]>;
}

// Repository interface para Post
export interface PostRepository {
  getPostById(id: string): Promise<Post | null>;
  getPostsByUserId(userId: string): Promise<Post[]>;
  getFeedPosts(userId: string, limit?: number, offset?: number): Promise<Post[]>;
  createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post>;
  updatePost(id: string, updates: Partial<Post>): Promise<Post>;
  deletePost(id: string): Promise<void>;
  likePost(postId: string, userId: string): Promise<void>;
  unlikePost(postId: string, userId: string): Promise<void>;
  bookmarkPost(postId: string, userId: string): Promise<void>;
  unbookmarkPost(postId: string, userId: string): Promise<void>;
  getBookmarkedPosts(userId: string): Promise<Post[]>;
}

// Repository interface para Chat
export interface ChatRepository {
  getChatById(id: string): Promise<Chat | null>;
  getChatsByUserId(userId: string): Promise<Chat[]>;
  createChat(participants: string[], isGroup?: boolean): Promise<Chat>;
  updateChat(id: string, updates: Partial<Chat>): Promise<Chat>;
  deleteChat(id: string): Promise<void>;
  addParticipant(chatId: string, userId: string): Promise<void>;
  removeParticipant(chatId: string, userId: string): Promise<void>;
}

// Repository interface para Message
export interface MessageRepository {
  getMessagesByChatId(chatId: string, limit?: number, offset?: number): Promise<Message[]>;
  sendMessage(message: Omit<Message, 'id' | 'createdAt'>): Promise<Message>;
  markMessageAsRead(messageId: string): Promise<void>;
  markChatMessagesAsRead(chatId: string, userId: string): Promise<void>;
  deleteMessage(messageId: string): Promise<void>;
}

// Repository interface para Story
export interface StoryRepository {
  getStoriesByUserId(userId: string): Promise<Story[]>;
  getFollowingStories(userId: string): Promise<Story[]>;
  createStory(story: Omit<Story, 'id' | 'createdAt'>): Promise<Story>;
  viewStory(storyId: string, userId: string): Promise<void>;
  deleteStory(id: string): Promise<void>;
  getExpiredStories(): Promise<Story[]>;
}

// Repository interface para Reel
export interface ReelRepository {
  getReelById(id: string): Promise<Reel | null>;
  getReelsByUserId(userId: string): Promise<Reel[]>;
  getDiscoverReels(userId: string, limit?: number, offset?: number): Promise<Reel[]>;
  createReel(reel: Omit<Reel, 'id' | 'createdAt'>): Promise<Reel>;
  updateReel(id: string, updates: Partial<Reel>): Promise<Reel>;
  deleteReel(id: string): Promise<void>;
  likeReel(reelId: string, userId: string): Promise<void>;
  unlikeReel(reelId: string, userId: string): Promise<void>;
  incrementViewCount(reelId: string): Promise<void>;
}

// Repository interface para Notification
export interface NotificationRepository {
  getNotificationsByUserId(userId: string): Promise<Notification[]>;
  createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<void>;
  markAllNotificationsAsRead(userId: string): Promise<void>;
  deleteNotification(id: string): Promise<void>;
  getUnreadCount(userId: string): Promise<number>;
}