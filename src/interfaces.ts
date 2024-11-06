export interface FetchResult<T> {
    data: T[]
    loading: boolean
    error: string | Error | null
    hasMore: boolean
    fetchData: () => void
}

export interface IPost {
    id: string
    userId: string
    username: string
    avatar: string
    shopName: string
    shopId: string
    images: string[],
    comments: number
    date: string
    text: string
    likes: number
    didLike: boolean
    premium: boolean
}

export interface IToolsBar {
    inputValue: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}