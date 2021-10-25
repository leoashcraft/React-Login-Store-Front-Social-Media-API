import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import SinglePost from "../components/SinglePost";

function Post(props) {
    const { id } = props.match.params
    const {tokenStr } = useContext(UserContext);
    const [isloading, setIsLoading] = useState(true);
    const [post, setLoadedPosts] = useState("");

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            // "Access-Control-Allow-Origin": "*",
            // 'mode': 'no-cors',
            'x-access-token' : tokenStr
        }
      };

    const getPost = (num) => {
        axios.get(`/api/post/${num}`, axiosConfig).then((response) => {
            setIsLoading(false)
            setLoadedPosts(response.data)
            console.log(response.data)
          });
    }
    useEffect(() => {
        getPost(id)
      }, []);

      if (isloading) {
        return <section>
            <p>Loading...</p>
        </section>
    }

    return (
        <div className="container">
            <div className="row g-3">
                <SinglePost key={post.id} username={post.username} text={post.text} id={post.id} />
            </div>
        </div>
    )
}

export default Post
