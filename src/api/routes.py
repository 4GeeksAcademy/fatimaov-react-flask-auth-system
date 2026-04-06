"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from sqlalchemy import select
from werkzeug.security import generate_password_hash, check_password_hash

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
    # Validate that all fields are strings
    if not all([
        isinstance(email, str),
        isinstance(password, str)
    ]):
        return jsonify(response="All fields must be text values"), 400
    
    # Normalize email and password by trimming surrounding whitespace
    email = email.strip()
    password = password.strip()
    # If email or password is missing, return a 400 response
    if not all([
        email,
        password
    ]):
        return jsonify(response = "Email and password are required"), 400

    # Check whether the user exists in the database
    user_exists = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()
    # If the user does not exist, return a 401 response
    if user_exists is None:
        return jsonify(response = "Incorrect email or password"), 401
    
    # If the user exists, verify the password
    user_password = user_exists.password
    # If the password is incorrect, return a 401 response
    if not check_password_hash(user_password, password):
        return jsonify(response = "Incorrect email or password"), 401
    
    # If the credentials are valid, generate the access token
    access_token = create_access_token(identity=user_exists.id)
    # Return a 200 OK response with the token
    return jsonify(access_token=access_token), 200


@api.route("/signup", methods=["POST"])
def signup():
    # Parse signup data from the request body
    data = request.get_json(silent=True) or {}
    # Read first_name, last_name, email, and password from the payload
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    password = data.get("password")
    # Validate that all fields are strings
    if not all([
        isinstance(first_name, str),
        isinstance(last_name, str),
        isinstance(email, str),
        isinstance(password, str)
    ]):
        return jsonify(response="All fields must be text values"), 400
    
    # Normalize the fields by trimming surrounding whitespace
    first_name = first_name.strip()
    last_name = last_name.strip()
    email = email.strip()
    password = password.strip()
    # Validate that all required fields are present
    if not all([
        first_name,
        last_name,
        email,
        password
    ]):
        return jsonify(response="First name, last name, email, and password are required"), 400
    
    # Check whether the email is already registered
    email_exists = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()
    if email_exists is not None:
        return jsonify(response="Unable to create account with the provided information"), 400

    # Generate password hash
    hashed_password = generate_password_hash(password)
    # Create a new User instance with the validated data
    user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password, is_active=True)
    # Save the new user to the database
    db.session.add(user)
    db.session.commit()
    # Return a 200 response with a success message
    return jsonify(response="Account created successfully"), 200

