import React, { useState } from 'react'
import Comment from './Comment';


const CommentSection = () => {
    const[comments,setComments]=useState([]);
    const[newComment,setNewComment]=useState('');
    const[sorting,setSorting]=useState('newest');
    const handleAddComment=()=>{
      console.log(comments.length);
    const comment={
      id:Number(comments.length)+1,
      content:newComment,
      replies:[],
      score:0
    };
    setComments([...comments,comment]);
    setNewComment('');
  }
  const handleReply=( commentId,replyContent)=>{
    const updatedComments=comments.map((comment)=>{
      if(comment.id===commentId){
        return {
          ...comment,
          replies:[...comment.replies,
          {id:Number(comment.replies.length)+1,content:replyContent,score:0}]
        }
      }
      return comment
    })
    setComments(updatedComments)
  }
  const handleUpvote=(commentId)=>{
const updatedComments=comments.map((comment)=>{
  if(comment.id===commentId){
    return {...comment,score:Number(comment.score)+1};
  }
  return comment;
})
setComments(updatedComments)
  }
  const handleDownvote=(commentId)=>{
  const updatedComments=comments.map((comment)=>{
    if(comment.id===commentId){
      return {...comment,score:Number(comment.score)-1}
    }
    return comment
  })
  setComments(updatedComments);
  }
  const handleSortingChange=(event)=>{
   setSorting(event.target.value);
  }
   const sortComments=(a,b)=>{
   switch(sorting){
    case 'newest':
      return b.id-a.id;
      case 'oldest':
        return a.id-b.id;
        case "mostScore":
          return b.score-a.score;
          case "leastScore":
            return a.score-b.score;
            default:
              return 0
   
  }
}
     const sortedComments=[...comments].sort(sortComments);
  return (
    <div>
<h2>Comment Section</h2>
<div style={{display:'flex',width:'80%',margin:'auto',gap:'20px'}}>
    <textarea  value={newComment}
    onChange={(e)=>setNewComment(e.target.value)}
    ></textarea>
    <button onClick={handleAddComment}>Add Comment</button>

<div style={{}}>
  <label >Sort By:</label>
  <select value={sorting} onChange={handleSortingChange}>
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
    <option value="mostScore"> Most Score</option>
    <option value="leastScore">Least Score</option>
  </select>
</div>
</div>
{
  sortedComments.map((ele)=>{
    return <Comment key={ele.id} comment={ele} onReply={handleReply} onUpvote={handleUpvote} onDownvote={handleDownvote}/>
  })
}
    </div>
  )
}

export default CommentSection