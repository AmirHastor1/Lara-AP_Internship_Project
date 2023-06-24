export interface NewsFeedItem {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    likes: number;
    comments: number;
    commentSection: Comment[];
    createdAt: Date;
  }
  
  export interface Comment {
    id: number;
    userId: number;
    userName: string;
    commentText: string;
    createdAt: Date;
  }