import { useContext, useState, useEffect} from 'react/cjs/react.development'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'
import Deletepost from './Deletepost';

function SinglePost(props) {
    const { user, tokenStr } = useContext(UserContext);
    console.log("Username is", props.username, "User is", user)
    const propIdUrl = '/post/' + props.id
    const updateurl = '/updatepost/' + props.id
    const deleteurl = "/deletepost/" + props.id
    return (
        <div className="col-12 col-sm-12 col-md-12">
            <div className="p-3 card category-card">
            <p className="card-header text-start"><Link to={propIdUrl} className="nav-link active text-dark" aria-current="page">
                {props.text}
                </Link>
                </p>
            <p className="card-body p-1 text-end">{props.username}</p>
            {props.username == user ? 
            <div>

            <p><Link to={updateurl} className="text-center text-decoration-none" aria-current="page">
                Edit
                </Link>-
                <Link to={deleteurl} className="text-center mt-0 p-1 text-danger text-decoration-none" aria-current="page">
                Delete
                </Link></p>
            </div> : null}
            </div>
        </div>
    )
}

export default SinglePost;