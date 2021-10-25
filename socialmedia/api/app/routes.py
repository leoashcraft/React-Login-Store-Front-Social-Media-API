from operator import pos
from flask import request, jsonify, make_response
from app import app, db
from .models import User, Post
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        
        if not token:
            return jsonify({"message" : 'Token is missing'}), 401

        try:
            print("Before")
            data = jwt.decode(token, "secret", algorithms=["HS256"])
            print(data)
            current_user = User.query.filter_by(id=data['user_id']).first()
        except:
            return jsonify({"message" : 'Token is invalid'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated


@app.route("/api/")
def index():
    return jsonify({"message" : "Welcome"})

@app.route("/api/user", methods=['POST'])
def create_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'])
    new_user = User(username = data['username'], password = hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message' :'New user created'})


@app.route('/api/login', methods=['POST'])
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    user = User.query.filter_by(username=auth.username).first()
    print("Username", auth.username, "Password", auth.password)
    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
    if check_password_hash(user.password, auth.password):
        token = jwt.encode({"user_id": user.id}, "secret", algorithm="HS256")
        return jsonify({'token' : token})
    
    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})


@app.route('/api/post', methods=['POST'])
@token_required
def create_post(current_user):
    data = request.get_json()
    new_post = Post(text=data['text'], user_id=current_user.id)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message' : 'Post created'})

@app.route('/api/posts', methods=['GET'])
@token_required
def get_all_post(current_user):
    posts = Post.query.all()
    output = []

    for post in posts:
        post_data = {}
        post_data['id'] = post.id
        post_data["user_id"] = post.user_id
        post_data["username"] = str(post.author)
        post_data["text"] = post.text
        output.append(post_data)

    return jsonify({"posts" : output[::-1]})

@app.route('/api/myposts', methods=['GET'])
@token_required
def get_user_posts(current_user):
    posts = Post.query.filter_by(user_id = current_user.id)
    output = []

    for post in posts:
        post_data = {}
        post_data['id'] = post.id
        post_data["user_id"] = post.user_id
        post_data["username"] = str(post.author)
        post_data["text"] = post.text
        output.append(post_data)

    return jsonify({"posts" : output})

@app.route('/api/post/<post_id>', methods=['GET'])
@token_required
def get_one_post(current_user, post_id):
    post = Post.query.filter_by(id=post_id).first()

    if not post:
        return jsonify({"message" : "No post found!"})

    post_data = {}
    post_data['id'] = post.id
    post_data['text'] = post.text
    post_data["user_id"] = post.user_id
    post_data["username"] = str(post.author)
    post_data["text"] = post.text
    return jsonify(post_data)

@app.route('/api/post/<post_id>', methods=['PUT'])
@token_required
def edit_post(current_user, post_id):
    post = Post.query.filter_by(id=post_id, user_id = current_user.id).first()
    data = request.get_json()

    if not post:
        return jsonify({"message" : "No post found!"})

    post.text = data["text"]
    db.session.commit()
    return jsonify({"message" : "Post has been updated!"})
    
@app.route('/api/post/<post_id>', methods=['DELETE'])
@token_required
def delete_post(current_user, post_id):
    post = Post.query.filter_by(id=post_id, user_id = current_user.id).first()

    if not post:
        return jsonify({"message" : "No post found!"})

    db.session.delete(post)
    db.session.commit()
    return jsonify({"message" : "Post has been deleted!"})
    