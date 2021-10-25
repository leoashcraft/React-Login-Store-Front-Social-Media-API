import SinglePost from "./SinglePost";

function PostList(props) {
    return (
        <div className="container">
            <div className="row g-3">
                {props.posts.map((post) => 
                <SinglePost key={post.id} username={post.username} text={post.text} id={post.id} />
                )}
            </div>
        </div>
    )
}

export default PostList;