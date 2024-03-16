from config import db, app
from models import User, Recipe, Ingredient, RecipeIngredient, UserRecipe
from faker import Faker
import random

fake = Faker()

def clear_data():
    db.session.query(User).delete()
    db.session.query(Recipe).delete()
    db.session.query(Ingredient).delete()
    db.session.query(RecipeIngredient).delete()
    db.session.query(UserRecipe).delete()
    db.session.commit()

def seed_data():
    pass

if __name__ == '__main__':
    with app.app_context():
        print('Clearing tables...')
        clear_data()
        print('Seeding tables...')
        seed_data()
        print('Tables seeded!')