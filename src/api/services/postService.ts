import apiClient from '../config/axios';

export interface PostRequest {
  userId?: string;
  page: number;
  limit: number;
}

export interface PostImage {
  image: string;
}

export interface Post {
  id: string;
  name: string;
  image: string;
  date: string;
  postimage?: PostImage[];
  like: string;
  comment: string;
  posttitle: string;
  posttag: string;
  hasStory: boolean;
  reelsvideo?: string;
  caption?: string;
  background?: string;
}

export interface PostResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

class PostService {
  async getPosts(params: PostRequest): Promise<PostResponse> {
    try {
      const response = await apiClient.get<PostResponse>('/posts', {
        params: {
          userId: params.userId,
          page: params.page,
          limit: params.limit,
        },
      });
      return response.data.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch posts',
        status_code: error.response?.status || 0,
      };
    }
  }
}

export const postService = new PostService();
