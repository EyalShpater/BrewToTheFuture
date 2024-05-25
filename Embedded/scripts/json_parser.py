# json_parser.py
import json
from brew_classes import Step, Brew

def parse_brew(json_data: str) -> Brew:
    data = json.loads(json_data)
    steps = [Step(**step) for step in data['step']]
    brew = Brew(
        brew_id=data['brew_id'],
        recipe_id=data['recipe_id'],
        recipe_name=data['recipe_name'],
        user_id=data['user_id'],
        steps=steps
    )
    return brew
