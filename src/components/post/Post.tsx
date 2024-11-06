import { useEffect, useRef, useState } from 'react'
import './Post.css'
import { IPost } from '../../interfaces'
import like from '../../assets/like.svg'
import likeButton from '../../assets/like-button.svg'
import commentButton from '../../assets/comment-button.svg'
import { timeAgo } from '../../utils'
import { useOnScreen } from '../../hooks/useOnScreen'

export const Post = ({ id, username, avatar, shopName, images, comments, date, text, likes, didLike }: IPost) => {

    const [isLiked, setIsLiked] = useState<boolean>(didLike);
    const [likesCount, setLikesCount] = useState<number>(likes);
    const [hasImpressionSent, setHasImpressionSent] = useState(false);


    const postRef = useRef(null)

    const isVisible = useOnScreen(postRef, '0px')

    useEffect(() => {
        if (isVisible && !hasImpressionSent) {
            fetch(`https://backend.tedooo.com/?itemId=${id}`, { method: 'GET' })
                .then(response => {
                    if (response.ok) {
                        console.log(`Impression sent for item ${id}`);
                        setHasImpressionSent(true);
                    }
                })
                .catch(error => console.error(`Failed to send impression for item ${id}`, error));
        }
    }, [isVisible, hasImpressionSent, id]);

    const handleLikeClick = () => {
        const currLike = !isLiked
        setIsLiked(currLike)
        setLikesCount((prevLikes) => {
            return currLike ? prevLikes + 1 : Math.max(prevLikes - 1, 0);
        });
    };

    return (
        <div ref={postRef} className='post--container'>
            <div className='user-details'>
                <div>
                    <img width='40px' height='40px' src={avatar} alt={'user-avatar'} />
                </div>
                <div className='user-specifics'>
                    <div className='username'>{username}</div>
                    <div className='shop-name'>{shopName} <span>{timeAgo(date)}</span></div>
                </div>
            </div>
            <div className='post-text'>
                {text}
            </div>
            <div className='post-images'>
                {images.slice(0, 2).map(image => <img key={image} src={image} alt={`Image for post by ${username}`} />)}
            </div>
            <div className='post--footer'>
                <div className='post-impressions'>
                    <div className='post-likes'>
                        <img src={like} alt='Like icon' />
                        <span>{`${likesCount} Likes`}</span>
                    </div>
                    <div className='post-comments'>
                        {`${comments} Comments`}
                    </div>
                </div>
                <div className='post-buttons'>
                    <div className={`like-button ${isLiked ? 'active' : ''}`} onClick={handleLikeClick}>
                        <img width='18px' height='24px' src={likeButton} />
                        <button>Like</button>
                    </div>
                    <div>
                        <img src={commentButton} />
                        <button>Comment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
