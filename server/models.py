from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from datetime import datetime
import ipdb

class User(db.Model, SerializerMixin):
  __tablename__ = 'users'
  # Attributes
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, nullable=False, unique=True)
  _password_hash = db.Column(db.String, nullable=False)
  email = db.Column(db.String, nullable=False, unique=True)
  profile_image = db.Column(db.String)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, onupdate=db.func.now())
  # Relationships
  recipes = db.relationship('UserRecipe', back_populates='users')
  # Serialization
  serialize_rules = ('-recipes.users',)
  # Validation
  @validates('username')
  def validate_username(self, key, username):
    if username:
      return username
    else:
      raise ValueError('Username is required')
    
  @validates('email')
  def validate_email(self, key, email):
    if email:
      return email
    else:
      raise ValueError('Email is required')
  
  # Auth for Login/Signup
  @hybrid_property
  def password_hash(self):
    return self._password_hash
  
  @password_hash.setter
  def password_hash(self, password):
    # ipdb.set_trace()
    password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
    self._password_hash = password_hash.decode('utf-8')

  def authenticate(self, password):
    return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Recipe(db.Model, SerializerMixin):
  __tablename__ ='recipes'
  # Attributes
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  category = db.Column(db.String, nullable=False)
  recipe_image = db.Column(db.String)
  instructions = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, onupdate=db.func.now())
  # Relationships
  ingredients = db.relationship('RecipeIngredient', back_populates='recipes')
  users = db.relationship('UserRecipe', back_populates='recipes')
  # Serialization
  serialize_rules = ('-ingredients.recipes', '-users.recipes',)

# No Validations because there are many ways to make the same dish.
    
class Ingredient(db.Model, SerializerMixin):
  __tablename__ = 'ingredients'
  # Attributes
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  ingredient_image = db.Column(db.String)
  ingredient_type = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, onupdate=db.func.now())
  # Relationships
  recipes = db.relationship('RecipeIngredient', back_populates='ingredients')
  # Serialization
  serialize_rules = ('-recipes.ingredients',)
  # Validation
  @validates('name')
  def validate_name(self, key, name):
    if name:
      return name
    else: 
      raise ValueError(f'Name is required, {key}')
    
class RecipeIngredient(db.Model, SerializerMixin):
  __tablename__ ='recipe_ingredients'
  # Attributes
  id = db.Column(db.Integer, primary_key=True)
  recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
  ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'), nullable=False)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, onupdate=db.func.now())
  # Relationships
  recipes = db.relationship('Recipe', back_populates='ingredients')
  ingredients = db.relationship('Ingredient', back_populates='recipes')
  # Serialization
  serialize_rules = ('-recipes.ingredients', '-ingredients.recipes',)
  # Validation
  @validates('recipe_id')
  def validate_recipe_id(self, key, recipe_id):
    if not recipe_id:
      raise ValueError(f'Recipe ID is required, {key}')
    else:
      return recipe_id
    
  @validates('ingredient_id')
  def validate_ingredient_id(self, key, ingredient_id):
    if not ingredient_id:
      raise ValueError(f'Ingredient ID is required, {key}')
    else:
      return ingredient_id
    
class UserRecipe(db.Model, SerializerMixin):
  __tablename__ = 'user_recipes'
  #Attributes
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, onupdate=db.func.now())
  # Relationships
  users = db.relationship('User', back_populates='recipes')
  recipes = db.relationship('Recipe', back_populates='users')
  # Serialization
  serialize_rules = ('-users.recipes', '-recipes.users',)
  # Validation
  @validates('user_id')
  def validate_user_id(self, key, user_id):
    if not user_id:
      raise ValueError(f'User ID is required, {key}')
    else:
      return user_id
    
  @validates('recipe_id')
  def validate_recipe_id(self, key, recipe_id):
    if not recipe_id:
      raise ValueError(f'Recipe ID is required, {key}')
    else:
      return recipe_id