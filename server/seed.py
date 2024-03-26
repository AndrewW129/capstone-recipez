from config import db, app
from models import User, Recipe, Ingredient, RecipeIngredient, UserRecipe
from faker import Faker
import random
import ipdb

fake = Faker()

def clear_data():
    db.session.query(User).delete()
    db.session.query(Recipe).delete()
    db.session.query(Ingredient).delete()
    db.session.query(RecipeIngredient).delete()
    db.session.query(UserRecipe).delete()
    db.session.commit()

def seed_users():
    print("Seeding users...")

    pictures = [
        "https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1561816544-21ecbffa09a3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
    ]
    
    for i in range(10):
        user = User(
            username=f"user_{i}",
            email=f"user_{i}@example.com",
            password_hash="password123",
            profile_image = random.choice(pictures)
        )
        # ipdb.set_trace()
        db.session.add(user)
    db.session.commit()

    print("Users seeded.")

# def generate_recipes(num_recipes):
  
#   pasta_titles = ['Spaghetti Carbonara', 'Chicken Alfredo', 'Lasagna', 'Penne Arrabiata', 'Fettuccine Alfredo']
#   pizza_titles = ['Margherita Pizza', 'Pepperoni Pizza', 'Vegetarian Pizza', 'BBQ Chicken Pizza', 'Hawaiian Pizza']
#   asian_titles = ['Beef Stir Fry', 'Chicken Teriyaki', 'Pad Thai', 'Sushi Rolls', 'General Tso\'s Chicken']
#   dessert_titles = ['Chocolate Chip Cookies', 'Cheesecake', 'Apple Pie', 'Tiramisu', 'Brownies']
#   salad_titles = ['Caesar Salad', 'Greek Salad', 'Cobb Salad', 'Caprese Salad', 'Chicken Caesar Salad']
#   soup_titles = ['Tomato Soup', 'Chicken Noodle Soup', 'Minestrone Soup', 'Broccoli Cheddar Soup', 'Lentil Soup']
#   sandwich_titles = ['BLT Sandwich', 'Grilled Cheese Sandwich', 'Club Sandwich', 'Turkey Sandwich', 'Pulled Pork Sandwich']
#   bbq_titles = ['BBQ Ribs', 'Grilled Chicken', 'Pulled Pork', 'Barbecue Brisket', 'BBQ Burgers']
    
#   categories = ['Pasta', 'Pizza', 'Asian', 'Dessert', 'Salad', 'Soup', 'Sandwich', 'BBQ']

#   recipes = []
#   for i in range(num_recipes):
#     category = random.choice(categories)
#     if category == 'Pasta':
#         title = random.choice(pasta_titles)
#     elif category == 'Pizza':
#         title = random.choice(pizza_titles)
#     elif category == 'Asian':
#         title = random.choice(asian_titles)
#     elif category == 'Dessert':
#         title = random.choice(dessert_titles)
#     elif category == 'Salad':
#         title = random.choice(salad_titles)
#     elif category == 'Soup':
#         title = random.choice(soup_titles)
#     elif category == 'Sandwich':
#         title = random.choice(sandwich_titles)
#     elif category == 'BBQ':
#         title = random.choice(bbq_titles)

#     instructions = f'Prepare {title} by following the recipe instructions. Add the additional steps here.'
            
#     recipe = {
#         'title': title,
#         'category': category,
#         'recipe_image': 'https://placehold.co/600x400/EEE/31343C',
#         'instructions': instructions
#     }
#     recipes.append(recipe)
    
#     return recipes

# def seed_recipes():
#     print("Seeding recipes...")
    
#     recipes_data = generate_recipes()
    
#     for recipe_data in recipes_data:
#         recipe = Recipe(
#             title=recipe_data['title'],
#             category=recipe_data['category'],
#             recipe_image=recipe_data['recipe_image'],
#             instructions=recipe_data['instructions']
#         )
#         db.session.add(recipe)
    
#     db.session.commit()
#     print("Recipes seeded.")

def seed_recipes():
    print("Seeding recipes...")
    recipe1 = Recipe(
        title='Spaghetti Ca nbonara',
        category='Pasta',
        recipe_image='https://cdn.georgeinstitute.org/sites/default/files/styles/width1920_fallback/public/2020-10/world-food-day-2020.png',
        instructions='Cook spaghetti according to package instructions. '
                     'Meanwhile, cook pancetta in a skillet until crispy. '
                     'In a bowl, whisk eggs, grated cheese, and black pepper. '
                     'Add cooked spaghetti to the skillet with pancetta, then pour the egg mixture over it. '
                     'Toss everything together until the eggs thicken and coat the spaghetti. '
                     'Serve hot with additional grated cheese and black pepper.'
    )
    recipe2 = Recipe(
        title='Chicken Alfredo',
        category='Pasta',
        recipe_image='https://cdn.georgeinstitute.org/sites/default/files/styles/width1920_fallback/public/2020-10/world-food-day-2020.png',
        instructions='Cook fettuccine according to package instructions. '
                     'In a skillet, cook diced chicken until no longer pink. '
                     'Add heavy cream, grated Parmesan cheese, and minced garlic to the skillet. '
                     'Simmer until the sauce thickens. '
                     'Add cooked fettuccine to the skillet and toss to coat. '
                     'Serve hot with chopped parsley.'
    )
    recipe3 = Recipe(
        title='Margherita Pizza',
        category='Pizza',
        recipe_image='https://cdn.georgeinstitute.org/sites/default/files/styles/width1920_fallback/public/2020-10/world-food-day-2020.png',
        instructions='Roll out pizza dough into a circle. Spread tomato sauce over the dough. '
                     'Sprinkle shredded mozzarella cheese on top. '
                     'Add fresh basil leaves and sliced tomatoes. '
                     'Bake in a preheated oven until the crust is golden and the cheese is melted and bubbly.'
    )
    recipe4 = Recipe(
        title='Beef Stir Fry',
        category='Asian',
        recipe_image='https://cdn.georgeinstitute.org/sites/default/files/styles/width1920_fallback/public/2020-10/world-food-day-2020.png',        
        instructions='Slice beef thinly. Marinate beef slices with soy sauce, sesame oil, and ginger. '
                     'In a wok, heat oil and stir-fry beef until browned. '
                     'Add sliced vegetables (such as bell peppers, carrots, and broccoli) and continue stir-frying. '
                     'Add a mixture of soy sauce and cornstarch to thicken the sauce. '
                     'Serve hot with rice.'
    )
    recipe5 = Recipe(
        title='Chocolate Chip Cookies',
        category='Dessert',
        recipe_image='https://cdn.georgeinstitute.org/sites/default/files/styles/width1920_fallback/public/2020-10/world-food-day-2020.png',        
        instructions='Preheat oven to 350°F (175°C). In a mixing bowl, cream together butter, sugar, and brown sugar. '
                     'Add eggs and vanilla extract, and beat until smooth. '
                     'Gradually add flour, baking soda, and salt to the mixture, and mix until well combined. '
                     'Stir in chocolate chips. Drop spoonfuls of dough onto a baking sheet and bake for 10-12 minutes.'
    )
    recipe6 = Recipe(
        title='Caesar Salad',
        category='Salad',
        recipe_image='https://cdn.georgeinstitute.org/sites/default/files/styles/width1920_fallback/public/2020-10/world-food-day-2020.png',        
        instructions='In a large salad bowl, toss together chopped romaine lettuce, Caesar dressing, grated Parmesan cheese, '
                     'and croutons. Top with additional Parmesan cheese and freshly ground black pepper, if desired.'
    )
    db.session.add_all([recipe1, recipe2, recipe3, recipe4, recipe5, recipe6])
    db.session.commit()
    print("Recipes seeded.")

def seed_ingredients():
    print("Seeding ingredients...")
    ingredient1 = Ingredient(
        name='Spaghetti',
        ingredient_image='https://placehold.co/600x400/EEE/31343C',        
        ingredient_type='Pasta'
    )
    ingredient2 = Ingredient(
        name='Pancetta',
        ingredient_image='https://placehold.co/600x400/EEE/31343C',        
        ingredient_type='Meat'
    )
    ingredient3 = Ingredient(
        name='Eggs',
        ingredient_image='https://placehold.co/600x400/EEE/31343C',        
        ingredient_type='Dairy'
    )
    ingredient4 = Ingredient(
        name='Parmesan Cheese',
        ingredient_image='https://placehold.co/600x400/EEE/31343C',        
        ingredient_type='Dairy'
    )
    ingredient5 = Ingredient(
        name='Chicken Breast',
        ingredient_image='https://placehold.co/600x400/EEE/31343C',        
        ingredient_type='Meat'
    )
    ingredient6 = Ingredient(
        name='Fettuccine',
        ingredient_image='https://placehold.co/600x400/EEE/31343C',        
        ingredient_type='Pasta'
    )
    ingredient7 = Ingredient(
        name='Heavy Cream',
        ingredient_image='https://placehold.co/600x400/EEE/31343C',        
        ingredient_type='Dairy'
    )
    ingredient8 = Ingredient(
        name='Garlic',
        ingredient_image='https://placehold.co/600x400/EEE/31343C',        
        ingredient_type='Vegetable'
    )
    db.session.add_all([ingredient1, ingredient2, ingredient3, ingredient4,
                        ingredient5, ingredient6, ingredient7, ingredient8])
    db.session.commit()
    print("Ingredients seeded.")


def seed_recipe_ingredients():
    print("Seeding RecipeIngredient join")
    for i in range(6):
        ingredient = random.choice(Ingredient.query.all())
        recipe = random.choice(Recipe.query.all())
        recipe_ingredient = RecipeIngredient(recipe_id=recipe.id, ingredient_id=ingredient.id)
        db.session.add(recipe_ingredient)
        db.session.commit()

def seed_user_recipes():
    print("Seeding UserRecipe join")
    for i in range(8):
        user = random.choice(User.query.all())
        recipe = random.choice(Recipe.query.all())
        user_recipe = UserRecipe(user_id=user.id, recipe_id=recipe.id)
        db.session.add(user_recipe)
        db.session.commit()

def seed_data():
    seed_users()
    seed_recipes()
    seed_ingredients()
    seed_recipe_ingredients()
    seed_user_recipes()

if __name__ == '__main__':
    with app.app_context():
        print('Clearing tables...')
        clear_data()
        print('Seeding tables...')
        seed_data()
        print('Tables seeded!')