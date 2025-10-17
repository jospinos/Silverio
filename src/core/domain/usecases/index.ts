import { User, Post } from '../entities';
import { UserRepository, PostRepository } from '../repositories';

// Caso de uso base
export abstract class UseCase<TRequest, TResponse> {
  abstract execute(request: TRequest): Promise<TResponse>;
}

// ============= USER USE CASES =============

export class LoginUser extends UseCase<LoginUserRequest, LoginUserResponse> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    const { email, password } = request;
    
    // Validaciones
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Buscar usuario por email
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // En una implementación real, validarías la contraseña
    // Por ahora retornamos el usuario
    return {
      user,
      accessToken: 'jwt-token-here', // En una implementación real generarías un JWT
      refreshToken: 'refresh-token-here'
    };
  }
}

export class RegisterUser extends UseCase<RegisterUserRequest, RegisterUserResponse> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const { username, email, password } = request;

    // Validaciones
    if (!username || !email || !password) {
      throw new Error('Username, email and password are required');
    }

    // Verificar si el email ya existe
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Verificar si el username ya existe
    const existingUsername = await this.userRepository.getUserByUsername(username);
    if (existingUsername) {
      throw new Error('Username already exists');
    }

    // Crear usuario
    const newUser = await this.userRepository.createUser({
      username,
      email,
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      isVerified: false
    });

    return {
      user: newUser,
      accessToken: 'jwt-token-here',
      refreshToken: 'refresh-token-here'
    };
  }
}

export class GetUserProfile extends UseCase<GetUserProfileRequest, GetUserProfileResponse> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async execute(request: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.userRepository.getUserById(request.userId);
    if (!user) {
      throw new Error('User not found');
    }

    return { user };
  }
}

export class FollowUser extends UseCase<FollowUserRequest, FollowUserResponse> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async execute(request: FollowUserRequest): Promise<FollowUserResponse> {
    const { userId, targetUserId } = request;

    if (userId === targetUserId) {
      throw new Error('Cannot follow yourself');
    }

    await this.userRepository.followUser(userId, targetUserId);
    return { success: true };
  }
}

// ============= POST USE CASES =============

export class CreatePost extends UseCase<CreatePostRequest, CreatePostResponse> {
  constructor(private postRepository: PostRepository) {
    super();
  }

  async execute(request: CreatePostRequest): Promise<CreatePostResponse> {
    const { authorId, content, images, video, audio } = request;

    if (!content && !images && !video && !audio) {
      throw new Error('Post must have content or media');
    }

    const post = await this.postRepository.createPost({
      authorId,
      content,
      images,
      video,
      audio,
      author: {} as User, // Se poblará desde el repository
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      isBookmarked: false
    });

    return { post };
  }
}

export class GetFeedPosts extends UseCase<GetFeedPostsRequest, GetFeedPostsResponse> {
  constructor(private postRepository: PostRepository) {
    super();
  }

  async execute(request: GetFeedPostsRequest): Promise<GetFeedPostsResponse> {
    const { userId, limit = 20, offset = 0 } = request;
    
    const posts = await this.postRepository.getFeedPosts(userId, limit, offset);
    
    return { posts };
  }
}

export class LikePost extends UseCase<LikePostRequest, LikePostResponse> {
  constructor(private postRepository: PostRepository) {
    super();
  }

  async execute(request: LikePostRequest): Promise<LikePostResponse> {
    const { postId, userId } = request;
    
    await this.postRepository.likePost(postId, userId);
    
    return { success: true };
  }
}

// ============= REQUEST/RESPONSE TYPES =============

// User types
export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface GetUserProfileRequest {
  userId: string;
}

export interface GetUserProfileResponse {
  user: User;
}

export interface FollowUserRequest {
  userId: string;
  targetUserId: string;
}

export interface FollowUserResponse {
  success: boolean;
}

// Post types
export interface CreatePostRequest {
  authorId: string;
  content: string;
  images?: string[];
  video?: string;
  audio?: string;
}

export interface CreatePostResponse {
  post: Post;
}

export interface GetFeedPostsRequest {
  userId: string;
  limit?: number;
  offset?: number;
}

export interface GetFeedPostsResponse {
  posts: Post[];
}

export interface LikePostRequest {
  postId: string;
  userId: string;
}

export interface LikePostResponse {
  success: boolean;
}