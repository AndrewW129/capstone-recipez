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
    print("Seeding users table...")

    pictures = [
        "https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1561816544-21ecbffa09a3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
    ]

    for i in range(15):
        user = User(
            username=fake.name(),
            email=fake.email(),
            password_hash="password123",
            profile_image=random.choice(pictures)
            )
        db.session.add(user)
        db.session.commit()

    print("Users seeded!")

def seed_recipes():
    print("Seeding recipes...")
    recipe1 = Recipe(
        title='Spaghetti Carnbonara',
        category='Pasta',
        recipe_image='https://images.stockcake.com/public/a/2/f/a2f58e11-4d68-4927-9f9a-2d3c801b2738_large/gourmet-pasta-dish-stockcake.jpg',
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
        recipe_image='https://images.stockcake.com/public/6/c/1/6c196572-37dd-436f-bc72-2db870f46858_large/creamy-pasta-dinner-stockcake.jpg',
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
        recipe_image='https://images.stockcake.com/public/9/6/5/965c8499-ca54-4738-8310-3fe955ceb657_large/delicious-margherita-pizza-stockcake.jpg',
        instructions='Roll out pizza dough into a circle. Spread tomato sauce over the dough. '
                     'Sprinkle shredded mozzarella cheese on top. '
                     'Add fresh basil leaves and sliced tomatoes. '
                     'Bake in a preheated oven until the crust is golden and the cheese is melted and bubbly.'
    )
    recipe4 = Recipe(
        title='Caesar Salad',
        category='Salad',
        recipe_image='https://images.stockcake.com/public/7/3/a/73a78264-e376-4449-8b85-142a9a1a933b_large/caesar-salad-plate-stockcake.jpg',        
        instructions='In a large salad bowl, toss together chopped romaine lettuce, Caesar dressing, grated Parmesan cheese, '
                     'and croutons. Top with additional Parmesan cheese and freshly ground black pepper, if desired.'
    )
    recipe5 = Recipe(
    title='Beef Stir Fry',
    category='Asian',
    recipe_image='https://images.stockcake.com/public/6/b/5/6b5d03e6-62fc-47d3-9961-13598383f7c9_large/sizzling-beef-stir-fry-stockcake.jpg',
    instructions='Slice beef thinly. In a wok, stir-fry beef with vegetables of your choice and soy sauce. Serve hot over rice.'
    )

    recipe6 = Recipe(
        title='Chocolate Chip Cookies',
        category='Dessert',
        recipe_image='https://images.stockcake.com/public/5/3/1/531d9f0b-4f72-41a0-b043-7a379214a323_large/chocolate-chip-cookies-stockcake.jpg',
        instructions='Preheat oven. Mix butter, sugar, and eggs until creamy. Add flour and chocolate chips. Drop spoonfuls onto baking sheet and bake until golden brown.'
    )

    recipe7 = Recipe(
        title='Beef Tacos',
        category='Mexican',
        recipe_image='https://images.stockcake.com/public/c/5/0/c50500a3-634a-4879-9851-1df22bb8bc7f_large/savory-tacos-served-stockcake.jpg',
        instructions='Brown ground beef in a skillet. Add taco seasoning and water. Simmer until thickened. Serve in taco shells with toppings of your choice.'
    )

    recipe8 = Recipe(
        title='Vegetable Soup',
        category='Soup',
        recipe_image='https://images.stockcake.com/public/4/a/f/4afc846b-b175-40d5-ab8d-0b9d7bf94d7a_large/hearty-vegetable-soup-stockcake.jpg',
        instructions='In a pot, sauté onions, carrots, and celery until soft. Add broth, diced tomatoes, and vegetables. Simmer until vegetables are tender. Serve hot.'
    )

    recipe9 = Recipe(
        title='Sushi Rolls',
        category='Japanese',
        recipe_image='https://images.stockcake.com/public/5/3/0/530cb097-7567-445c-b7f0-20c3869d9b8b_large/colorful-sushi-roll-stockcake.jpg',
        instructions='Prepare sushi rice. Place nori sheet on bamboo mat. Spread rice evenly, add fillings, and roll tightly. Slice and serve with soy sauce and wasabi.'
    )

    recipe10 = Recipe(
        title='BBQ Ribs',
        category='Barbecue',
        recipe_image='https://images.stockcake.com/public/8/2/2/82294b3a-937f-41f8-a8ec-0d9bd7f249c3_large/sizzling-bbq-ribs-stockcake.jpg',
        instructions='Rub ribs with seasoning. Grill over low heat, basting with BBQ sauce, until tender. Serve hot with extra sauce.'
    )

    recipe11 = Recipe(
        title='Mushroom Risotto',
        category='Italian',
        recipe_image='https://images.stockcake.com/public/7/b/c/7bc91190-7781-4b30-9f49-74f2118266d9_large/elegant-mushroom-risotto-stockcake.jpg',
        instructions='Sauté mushrooms and onions in butter. Add Arborio rice and stir until translucent. Gradually add broth, stirring until absorbed. Serve hot with grated Parmesan.'
    )

    recipe12 = Recipe(
        title='Apple Pie',
        category='Dessert',
        recipe_image='https://images.stockcake.com/public/4/f/e/4fe75248-7f94-428f-b282-0d26e9a8d762_large/homemade-apple-pie-stockcake.jpg',
        instructions='Preheat oven. Mix sliced apples with sugar, cinnamon, and lemon juice. Fill pie crust, add top crust, and vent. Bake until golden brown.'
    )

    recipe13 = Recipe(
        title='Chicken Curry',
        category='Indian',
        recipe_image='https://images.stockcake.com/public/f/6/e/f6eca7fe-dd26-467a-b4b5-76e3ca123882_large/savory-chicken-curry-stockcake.jpg',
        instructions='Sauté onions, garlic, and ginger. Add chicken, curry paste, and coconut milk. Simmer until chicken is cooked through. Serve hot with rice.'
    )

    recipe14 = Recipe(
        title='Pancakes',
        category='Breakfast',
        recipe_image='https://images.stockcake.com/public/7/b/7/7b7bbe03-6ebc-4b1a-b535-3648bf175a20_large/dusted-pancake-tower-stockcake.jpg',
        instructions='Mix flour, milk, eggs, and sugar until smooth. Heat skillet and pour batter. Cook until bubbles form, then flip. Serve hot with syrup.'
    )

    recipe15 = Recipe(
        title='Beef Stew',
        category='Soup',
        recipe_image='https://images.stockcake.com/public/4/0/a/40a844f4-fcad-4a5a-98b3-dd3ffe5c2f7d_large/hearty-beef-stew-stockcake.jpg',
        instructions='Brown beef in a pot. Add onions, carrots, potatoes, and broth. Simmer until meat is tender. Serve hot with crusty bread.'
    )
    db.session.add_all([recipe1, recipe2, recipe3, recipe4, recipe5, recipe6, recipe7, recipe8])
    db.session.add_all([recipe9, recipe10, recipe11, recipe12, recipe13, recipe14, recipe15])
    db.session.commit()
    print("Recipes seeded.")

def seed_ingredients():
    print("Seeding ingredients...")
    ingredient1 = Ingredient(
        name='Noodles',
        ingredient_image='https://images.stockcake.com/public/1/e/2/1e2d18a6-a946-42d7-a7c4-fad47b227d9e_large/fresh-pasta-making-stockcake.jpg',        
        ingredient_type='Pasta'
    )
    ingredient2 = Ingredient(
        name='Beef',
        ingredient_image='https://images.stockcake.com/public/a/5/2/a523601f-a464-4eda-8ca3-9dc3f3534d26_large/fresh-beef-cubes-stockcake.jpg',        
        ingredient_type='Meat'
    )
    ingredient3 = Ingredient(
        name='Eggs',
        ingredient_image='https://images.stockcake.com/public/2/2/f/22f1b463-bdc9-4784-ab52-abf0e5605c67_large/cracked-open-egg-stockcake.jpg',        
        ingredient_type='Dairy'
    )
    ingredient4 = Ingredient(
        name='Parmesan Cheese',
        ingredient_image='https://images.stockcake.com/public/3/e/a/3eafa9a4-2383-4caf-a964-1a685fce623e_large/parmesan-cheese-wedge-stockcake.jpg',        
        ingredient_type='Dairy'
    )
    ingredient5 = Ingredient(
        name='Chicken Breast',
        ingredient_image='https://images.stockcake.com/public/4/9/8/498ecf64-2b94-4706-8a09-8b6b3d909965_large/delicious-grilled-chicken-stockcake.jpg',        
        ingredient_type='Meat'
    )
    ingredient6 = Ingredient(
        name='Fettuccine',
        ingredient_image='https://images.stockcake.com/public/c/7/d/c7d197db-faa2-4b3d-b27e-660d13e5f6a4_large/fresh-pasta-pile-stockcake.jpg',        
        ingredient_type='Pasta'
    )
    ingredient7 = Ingredient(
        name='Heavy Cream',
        ingredient_image='https://images.stockcake.com/public/2/a/c/2ac45982-32e7-4b2c-aacd-9da4ed9fca1e_large/baking-preparation-essentials-stockcake.jpg',        
        ingredient_type='Dairy'
    )
    ingredient8 = Ingredient(
        name='Garlic',
        ingredient_image='https://images.stockcake.com/public/1/8/5/18547309-f9db-47d6-9915-bddd781ca6c8_large/garlic-preparation-aromatics-stockcake.jpg',        
        ingredient_type='Vegetable'
    )
    ingredient9 = Ingredient(
        name='Black Pepper',
        ingredient_image='https://images.stockcake.com/public/f/4/6/f468ac50-46ee-44f5-9981-2c3e88a45f84_large/spilled-pepper-corns-stockcake.jpg',        
        ingredient_type='Spice'
    )
    ingredient10 = Ingredient(
        name='Tomatoes',
        ingredient_image='https://images.stockcake.com/public/b/f/f/bfff49c5-752c-4f3f-955c-bf82495463c9_large/juicy-tomatoes-cluster-stockcake.jpg',        
        ingredient_type='Vegetable'
    )
    ingredient11 = Ingredient(
        name='Basil',
        ingredient_image='https://images.stockcake.com/public/a/e/4/ae434adc-960f-4642-82b0-ca311788f0dd_large/fresh-basil-leaves-stockcake.jpg',        
        ingredient_type='Herb'
    )
    ingredient12 = Ingredient(
        name='Mozzarella Cheese',
        ingredient_image='https://images.stockcake.com/public/9/f/b/9fb55eeb-9f71-4009-85ad-d5f390b461cc_large/cheesy-mozzarella-sticks-stockcake.jpg',        
        ingredient_type='Dairy'
    )
    ingredient13 = Ingredient(
        name='Croutons',
        ingredient_image='https://images.stockcake.com/public/f/c/a/fcaeee6e-1ff2-4c40-88c8-d1c9c1df0b24_large/caesar-salad-plate-stockcake.jpg',        
        ingredient_type='Carb'
    )
    db.session.add_all([ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, ingredient7, ingredient8, ingredient9, ingredient10, ingredient11, ingredient12, ingredient13])
    db.session.commit()
    print("Ingredients seeded.")


def seed_recipe_ingredients():
    print("Seeding RecipeIngredient join")
    
    recipe_ingredients = [
        RecipeIngredient(
            recipe_id=1,
            ingredient_id=2
        ),
        RecipeIngredient(
            recipe_id=2,
            ingredient_id=3
        ),
        RecipeIngredient(
            recipe_id=3,
            ingredient_id=1
        ),
        RecipeIngredient(
            recipe_id=4,
            ingredient_id=5
        ),
        RecipeIngredient(
            recipe_id=5,
            ingredient_id=6
        ),
        RecipeIngredient(
            recipe_id=6,
            ingredient_id=4
        ),
        RecipeIngredient(
            recipe_id=7,
            ingredient_id=7
        ),
        RecipeIngredient(
            recipe_id=8,
            ingredient_id=8
        ),
        RecipeIngredient(
            recipe_id=9,
            ingredient_id=10
        ),
        RecipeIngredient(
            recipe_id=10,
            ingredient_id=13
        ),
        RecipeIngredient(
            recipe_id=11,
            ingredient_id=4
        ),
        RecipeIngredient(
            recipe_id=12,
            ingredient_id=9
        ),
        RecipeIngredient(
            recipe_id=13,
            ingredient_id=11
        ),
        RecipeIngredient(
            recipe_id=14,
            ingredient_id=12
        )
        ]
    db.session.add_all(recipe_ingredients)
    db.session.commit()

def seed_user_recipes():
    print("Seeding UserRecipe join")
    for i in range(10):
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
        print('Cleared tables!')
        print('Seeding tables...')
        seed_data()
        print('Tables seeded!')
