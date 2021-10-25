import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import PostList from "../components/PostList";
import Createpost from "../components/Createpost";

function Allposts() {
    const {tokenStr } = useContext(UserContext);
    const [isloading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [lenPost, setPostLenght] = useState(0)
    const [redo, setRedo] = useState(false)

    const loadit = () => {
      setRedo(true)
        axios.get('/api/posts', axiosConfig).then((response) => {  
        setLoadedPosts(response.data.posts)
          });
          
    }
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            // "Access-Control-Allow-Origin": "*",
            // 'mode': 'no-cors',
            'x-access-token' : tokenStr
        }
      };


    const getPosts = () => {
        axios.get('/api/posts', axiosConfig).then((response) => {
          
            const posts = response.data.posts
            setIsLoading(false)
            setLoadedPosts(posts)
          });
    }
    useEffect(() => {
        getPosts()
      }, [redo]);

      if (isloading) {
        return <section>
            <p>Loading...</p>
        </section>
    }

    return (
        <div>
        <Createpost load={loadit} />
        <h1 className="text-center mb-4">Posts</h1>
        <PostList  posts={loadedPosts} />
        </div>
      );
}

export default Allposts
