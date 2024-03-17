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

    for i in range(10):
        user = User(
            username=f"user_{i}",
            email=f"user_{i}@example.com",
            password_hash="password123"
        )
        # ipdb.set_trace()
        db.session.add(user)
    db.session.commit()

    print("Users seeded.")

def seed_recipes():
    print("Seeding recipes...")
    recipe1 = Recipe(
        title='Spaghetti Carbonara',
        category='Pasta',
        recipe_image='spaghetti_carbonara.jpg',
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
        recipe_image='chicken_alfredo.jpg',
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
        recipe_image='margherita_pizza.jpg',
        instructions='Roll out pizza dough into a circle. Spread tomato sauce over the dough. '
                     'Sprinkle shredded mozzarella cheese on top. '
                     'Add fresh basil leaves and sliced tomatoes. '
                     'Bake in a preheated oven until the crust is golden and the cheese is melted and bubbly.'
    )
    recipe4 = Recipe(
        title='Beef Stir Fry',
        category='Asian',
        recipe_image='beef_stir_fry.jpg',
        instructions='Slice beef thinly. Marinate beef slices with soy sauce, sesame oil, and ginger. '
                     'In a wok, heat oil and stir-fry beef until browned. '
                     'Add sliced vegetables (such as bell peppers, carrots, and broccoli) and continue stir-frying. '
                     'Add a mixture of soy sauce and cornstarch to thicken the sauce. '
                     'Serve hot with rice.'
    )
    recipe5 = Recipe(
        title='Chocolate Chip Cookies',
        category='Dessert',
        recipe_image='chocolate_chip_cookies.jpg',
        instructions='Preheat oven to 350°F (175°C). In a mixing bowl, cream together butter, sugar, and brown sugar. '
                     'Add eggs and vanilla extract, and beat until smooth. '
                     'Gradually add flour, baking soda, and salt to the mixture, and mix until well combined. '
                     'Stir in chocolate chips. Drop spoonfuls of dough onto a baking sheet and bake for 10-12 minutes.'
    )
    recipe6 = Recipe(
        title='Caesar Salad',
        category='Salad',
        recipe_image='caesar_salad.jpg',
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
        ingredient_image='spaghetti.jpg',
        ingredient_type='Pasta'
    )
    ingredient2 = Ingredient(
        name='Pancetta',
        ingredient_image='pancetta.jpg',
        ingredient_type='Meat'
    )
    ingredient3 = Ingredient(
        name='Eggs',
        ingredient_image='eggs.jpg',
        ingredient_type='Dairy'
    )
    ingredient4 = Ingredient(
        name='Parmesan Cheese',
        ingredient_image='parmesan_cheese.jpg',
        ingredient_type='Dairy'
    )
    ingredient5 = Ingredient(
        name='Chicken Breast',
        ingredient_image='chicken_breast.jpg',
        ingredient_type='Meat'
    )
    ingredient6 = Ingredient(
        name='Fettuccine',
        ingredient_image='fettuccine.jpg',
        ingredient_type='Pasta'
    )
    ingredient7 = Ingredient(
        name='Heavy Cream',
        ingredient_image='heavy_cream.jpg',
        ingredient_type='Dairy'
    )
    ingredient8 = Ingredient(
        name='Garlic',
        ingredient_image='garlic.jpg',
        ingredient_type='Vegetable'
    )
    db.session.add_all([ingredient1, ingredient2, ingredient3, ingredient4,
                        ingredient5, ingredient6, ingredient7, ingredient8])
    db.session.commit()
    print("Ingredients seeded.")


def seed_data():
    seed_users()
    seed_recipes()
    seed_ingredients()

if __name__ == '__main__':
    with app.app_context():
        print('Clearing tables...')
        clear_data()
        print('Seeding tables...')
        seed_data()
        print('Tables seeded!')