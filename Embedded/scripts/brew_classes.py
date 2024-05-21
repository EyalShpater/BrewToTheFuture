# brew_classes.py
from dataclasses import dataclass
from typing import List

@dataclass
class Step:
    step_id: int
    temperature_celsius: int
    duration_minutes: int
    approval_required: bool

@dataclass
class Brew:
    brew_id: int
    recipe_id: int
    recipe_name: str
    user_id: str
    steps: List[Step]
