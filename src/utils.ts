export function timeAgo(postDate: string): string {
    const now = new Date();
    const diff = now.getTime() - new Date(postDate).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `· ${minutes}m`;
    else if (hours < 24) return `· ${hours}h`;
    else return `· ${days}d`;
}