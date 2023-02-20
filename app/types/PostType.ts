export type CommentType = {
    createdAt?: string;
    id: string;
    postId: string;
    userId: string;
    message: string;
  };

export type PostType = {
    title: string
    id: string
    updatedAt?: string
    
    user: {
        name:string 
        image:string
        email: string
        id: string
    }
    Comment? : CommentType

}