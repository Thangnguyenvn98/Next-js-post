export type CommentType = {
    createdAt?: string;
    id: string;
    postId: string;
    userId: string;
    message: string;
    user: {
        name:string 
        image:string
        email: string
        id: string
    }
  }

