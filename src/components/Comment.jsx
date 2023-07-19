import React, { useState } from 'react'

const Comment = ({comment,onReply,onUpvote,onDownvote}) => {
    const[reply,setReply]=useState('');
    const handleReply=()=>{
       if(reply){
        onReply(comment.id,reply);
        setReply('');
       }
    }
  return (
    <div>
     <div>
        <p>{comment.content}</p>
        <button onClick={()=>onUpvote(Number(comment.id))}>Upvote</button>
        <span>{comment.score}</span>
        <button onClick={()=>onDownvote(Number(comment.id))}>Downvote</button>
     </div>
     <div>
        <textarea  value={reply}
        onChange={(e)=>setReply(e.target.value)}
        ></textarea>
        <button onClick={handleReply}>Reply</button>

     </div>
     {
        comment.replies.map((reply)=>{
            return <div key={reply.id}>
                <p>{reply.content}</p>
                <button onClick={()=>onUpvote(Number(reply.id))}>Upvote</button>
                <span>{reply.score}</span>
                <button onClick={()=>onDownvote(Number(reply.id))}>Downvote</button>
            </div>
        })
     }
    </div>
  )
}

export default Comment