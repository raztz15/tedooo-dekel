import './Feed.css'
import useFetch from '../../hooks/useFetch'
import { IPost } from '../../interfaces'
import { Post } from '../post/Post'
import { ToolsBar } from '../tools-bar/ToolsBar'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { useDebouncer } from '../../hooks/useDebouncer'

export const Feed = () => {

    const apiUrl = import.meta.env.VITE_API_URL

    const [posts, setPosts] = useState<IPost[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('');


    const { data, loading, hasMore, fetchData } = useFetch<IPost>(`${apiUrl}?skip=${skip}`);
    const debounce = useDebouncer(inputValue, 500)

    const filteredPosts = posts.filter(post => post.username.toLowerCase().includes(debounce.toLowerCase()))

    useEffect(() => {
        fetchData();
    }, [apiUrl, fetchData])

    useEffect(() => {
        if (data) {
            setPosts(prevPosts => ([...prevPosts, ...data]))
        }
    }, [data]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, hasMore]);

    const handleScroll = () => {
        const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
        if (bottom && hasMore && !loading) {
            setSkip(prev => prev + 6)
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setInputValue(value)
    }

    if (loading && posts.length === 0) return <div className='loader' ><CircularProgress size="100px" /></div>

    return (
        posts.length === 0 ? <h1>No posts to show</h1>
            : <>
                <ToolsBar inputValue={inputValue} handleChange={handleChange} />
                <div className='posts--container'>
                    <div className='posts--wrapper'>
                        {filteredPosts?.map(post => <div key={post.id}><Post {...post} /></div>)}
                    </div>
                    {loading && <div className='loading-more-message'>Loading more posts...</div>}
                    {!hasMore && !loading && <div className='stop-loading-message'>No more posts to load.</div>}
                </div>
            </>
    )
}
