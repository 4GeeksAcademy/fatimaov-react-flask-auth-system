"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from sqlalchemy import select

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    # Parse login credentials from the request body
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    password = data.get("password")
    # If email or password is missing, return a 400 response
    if not email or not email.strip() or not password or not password.strip():
        return jsonify(response = "Email and password are required"), 400

    # Normalize email and password by trimming surrounding whitespace
    email = email.strip()
    password = password.strip()
    # Check whether the user exists in the database
    user_exists = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()
    # If the user does not exist, return a 401 response
    if user_exists is None:
        return jsonify(response = "Incorrect email or password"), 401
    
    # If the user exists, verify the password
    user_password = user_exists.password
    # If the password is incorrect, return a 401 response
    if user_password != password:
        return jsonify(response = "Incorrect email or password"), 401
    
    # If the credentials are valid, generate the access token
    access_token = create_access_token(identity=user_exists.id)
    # Return a 200 OK response with the token
    return jsonify(access_token=access_token), 200
