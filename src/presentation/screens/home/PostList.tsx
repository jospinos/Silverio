import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import PostCard from '@presentation/components/common/PostCard';
import { SIZES } from '@shared/theme/theme';
import { postService, Post } from '@api/services/postService';
import { useAppSelector } from '@store/hooks';

interface PostListProps {
  sheetRef: any;
  optionSheet: any;
  userId?: string;
}

const PostList = (props: PostListProps, ref: any) => {
    const { user } = useAppSelector((state) => state.auth);
    const [postList, setPostList] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [visibleBoxes, setVisibleBoxes] = useState<any>([]);

    useImperativeHandle(ref, () => ({
        handleScroll: (e: any) => { handleScroll(e) },
        refreshPosts: () => { fetchPosts(1, true) }
    }))

    const fetchPosts = async (pageNumber: number = 1, refresh: boolean = false) => {
        if (isLoading) return;
        
        try {
            setIsLoading(true);
            setError(null);

            const response = await postService.getPosts({
                userId: props.userId || user?.id,
                page: pageNumber,
                limit: 10,
            });

            if (refresh) {
                setPostList(response.posts);
            } else {
                setPostList(prev => [...prev, ...response.posts]);
            }
            
            setHasMore(response.hasMore);
            setPage(pageNumber);
        } catch (error: any) {
            setError(error.message || 'Failed to load posts');
        } finally {
            setIsLoading(false);
        }
    };

    const loadMorePosts = () => {
        if (hasMore && !isLoading) {
            fetchPosts(page + 1, false);
        }
    };

    useEffect(() => {
        fetchPosts(1, true);
    }, [props.userId, user?.id]);

    const handleScroll = (event:any) => {
        const scrollY = event.nativeEvent.contentOffset.y;

        const visibleBoxIds = postList
            .map((box) => {
                const boxRef = boxRefs.current[box.id];
                if (!boxRef) return null;
                const boxY = boxRef.y;
                const boxHeight = boxRef.height;

                if (boxY < scrollY + SIZES.height / 1.5 && boxY + boxHeight > scrollY) {
                    return box.id;
                }

                return null;
            })
            .filter((id) => id !== null);

        setVisibleBoxes(visibleBoxIds);
    };

    const boxRefs = useRef<any>({});

    const handleBoxLayout = (id: any) => (event: any) => {
        const pageY = event.nativeEvent.layout.y;
        const height = event.nativeEvent.layout.height;
        boxRefs.current[id] = { y: pageY, height };
    };

    if (error) {
        return (
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View>
            {postList.map((post: Post, index: number) => {
                return (
                    <View
                        key={post.id}
                        onLayout={handleBoxLayout(post.id)}
                    >
                        <PostCard
                            id={post.id}
                            name={post.name}
                            profileimage={post.image}
                            date={post.date}
                            postimage={post.postimage}
                            like={post.like}
                            comment={post.comment}
                            posttitle={post.posttitle}
                            posttag={post.posttag}
                            sheetRef={props.sheetRef}
                            optionSheet={props.optionSheet}
                            hasStory={post.hasStory}
                            reelsvideo={post.reelsvideo}
                            caption={post.caption}
                            background={post.background}
                            visibleBoxes={visibleBoxes}
                        />
                        
                        {/* Load more cuando llegue al penúltimo post */}
                        {index === postList.length - 2 && hasMore && !isLoading && (
                            <View onLayout={loadMorePosts} />
                        )}
                    </View>
                );
            })}

            {isLoading && (
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            )}
        </View>
    )
}

export default forwardRef(PostList);