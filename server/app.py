from flask import Flask, make_response, request, session
from flask_restful import Resource
from models import db, User, Recipe, Ingredient, RecipeIngredient, UserRecipe
# Local imports
from config import app, api


@app.route("/")
def index():
    return "<h1>Project Server</h1><p>Change the endpoint to see data.</p>"

# RESTful routes
# '/users'
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        if not users:
           response = make_response({'error': 'No users found'}, 404)    
        response = make_response(users, 200)
        return response
    
    def post(self):
       req_data = request.get_json()
       try:
          new_user = User(
             username=req_data['username'],
             email=req_data['email'],
             password_hash=req_data['password']
          )
       except Exception as e:
          response = make_response({'error': [e.args]}, 400)

       db.session.add(new_user)
       db.session.commit()
      #  session['user_id'] = new_user.id instead of logging in on signup they will be redirected to login

       new_user_dict = new_user.to_dict()
       response = make_response(new_user_dict, 201)
       return response

# '/users/<int:id>
class UserByID(Resource):
    def get(self, id):
       user = User.query.filter_by(id=id).first()
       if not user:
           response = make_response({'error': 'User Not Found'}, 404)
       response = make_response(user.to_dict(), 200)
       return response
    
    def patch(self, id):
       user = User.query.filter_by(id=id).first()
       if not user:
          response = make_response({'error': 'User not found'}, 404)
       req_data = request.get_json()
       try:
         for key, value in req_data.items():
             setattr(user, key, value)
       except Exception as e:
          response = make_response({'error': [e.args]}, 400)
       response = make_response(user.to_dict(), 200)
        
       db.session.commit()

       return response 

    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            response = make_response({'error': 'User not found'}, 404)

        db.session.delete(user)
        db.session.commit()

        response = make_response({}, 204)
        return response
# '/recipes'
class Recipes(Resource):
    def get(self):
        recipes = [recipe.to_dict() for recipe in Recipe.query.all()]
        if not recipes:
           response = make_response({'error': 'No recipes found'}, 404)    
        response = make_response(recipes, 200)
        return response
    
    def post(self):
       req_data = request.get_json()
       try:
          new_recipe = Recipe(
             title=req_data['title'],
             category=req_data['category'],
             instructions=req_data['instructions']
          )
       except Exception as e:
          response = make_response({'error': [e.args]}, 400)
          return response

       db.session.add(new_recipe)
       db.session.commit()
# '/recipes/<int:id>'
class RecipeById(Resource):
    def get(self, id):
       recipe = Recipe.query.filter_by(id=id).first()
       if not recipe:
           response = make_response({'error': 'Recipe Not Found'}, 404)
       response = make_response(recipe.to_dict(), 200)
       return response
    
    def patch(self, id):
       recipe = Recipe.query.filter_by(id=id).first()
       if not recipe:
          response = make_response({'error': 'Recipe not found'}, 404)
       req_data = request.get_json()
       try:
         for key, value in req_data.items():
             setattr(recipe, key, value)
       except Exception as e:
          response = make_response({'error': [e.args]}, 400)
       response = make_response(recipe.to_dict(), 200)
        
       db.session.commit()

       return response
    
class Ingredients(Resource):
    def get(self):
        ingredients = [ingredient.to_dict() for ingredient in Ingredient.query.all()]
        if not ingredients:
           response = make_response({'error': 'No ingredients found'}, 404)    
        response = make_response(ingredients, 200)
        return response
    
    def post(self):
       req_data = request.get_json()
       try:
          new_ingredient = Ingredient(
             name=req_data['name'],
             ingredient_type=req_data['ingredient_type']
          )
       except Exception as e:
          response = make_response({'error': [e.args]}, 400)
          return response

       db.session.add(new_ingredient)
       db.session.commit()

class IngredientByID(Resource):
    def get(self, id):
       ingredient = Ingredient.query.filter_by(id=id).first()
       if not ingredient:
           response = make_response({'error': 'Ingredient Not Found'}, 404)
       response = make_response(ingredient.to_dict(), 200)
       return response

class RecipeIngrdients(Resource):
    def get(self):
       recipe_ingredients = [recipe_ingredient.to_dict() for recipe_ingredient in RecipeIngredient.query.all()]
       if not recipe_ingredients:
           response = make_response({'error': 'No recipe ingredients found'}, 404)
       response = make_response(recipe_ingredients, 200)
       return response
    
    def post(self):
       req_data = request.get_json()
       try:
          new_recipe_ingredient = RecipeIngredient(
             recipe_id=req_data['recipe_id'],
             ingredient_id=req_data['ingredient_id']
          )
       except Exception as e:
          response = make_response({'error': [e.args]}, 400)
          return response

       db.session.add(new_recipe_ingredient)
       db.session.commit()

class RecipeIngredientByID(Resource):
    def get(self, id):
       recipe_ingredient = RecipeIngredient.query.filter_by(id=id).first()
       if not recipe_ingredient:
           response = make_response({'error': 'Recipe Ingredient Not Found'}, 404)
       response = make_response(recipe_ingredient.to_dict(), 200)
       return response
    
class UserRecipes(Resource):
    def get(self):
       user_recipes = [user_recipe.to_dict() for user_recipe in UserRecipe.query.all()]
       if not user_recipes:
           response = make_response({'error': 'No user recipes found'}, 404)
       response = make_response(user_recipes, 200)
       return response
    
    def post(self):
       req_data = request.get_json()
       try:
          new_user_recipe = UserRecipe(
             user_id=req_data['user_id'],
             recipe_id=req_data['recipe_id']
          )
       except Exception as e:
          response = make_response({'error': [e.args]}, 400)
          return response

       db.session.add(new_user_recipe)
       db.session.commit()

class UserRecipeByID(Resource):
    def get(self, id):
       user_recipe = UserRecipe.query.filter_by(id=id).first()
       if not user_recipe:
           response = make_response({'error': 'User Recipe Not Found'}, 404)
       response = make_response(user_recipe.to_dict(), 200)
       return response
       


# adding routes to api
api.add_resource(Users, '/users', '/signup')
api.add_resource(UserByID, '/users/<int:id>')
api.add_resource(Recipes, '/recipes')
api.add_resource(RecipeById, '/recipes/<int:id>')
api.add_resource(Ingredients, '/ingredients')
api.add_resource(IngredientByID, '/ingredients/<int:id>')
api.add_resource(RecipeIngrdients, '/recipe_ingredients')
api.add_resource(RecipeIngredientByID, '/recipe_ingredients/<int:id>')
api.add_resource(UserRecipes, '/user_recipes')
api.add_resource(UserRecipeByID, '/user_recipes/<int:id>')


# Non-RESTful routes
@app.route('/login', methods=['POST'])
def login():
   user = User.query.filter_by(username=request.get_json()['username']).first()
    # not handling many requests so can be done this way.
   if user and user.authenticate(request.get_json()['password']):
      session['user_id'] = user.id # Logs user in
   else:
      response = make_response({'error': 'Invalid Username or Password'}, 404)
   response = make_response(user.to_dict(), 200)
   return response

@app.route('/authorized')
def authorized():
   user = User.query.filter_by(id=session.get('user_id')).first()
   if not user:
      response = make_response({'error': 'User not found'}, 404)
   response = make_response(user.to_dict(), 200)
   return response

@app.route('/logout', methods=['DELETE'])
def logout():
   session['user_id'] = None
   response = make_response({}, 204)
   return response

if __name__ == "__main__":
    app.run(port=5555, debug=True)