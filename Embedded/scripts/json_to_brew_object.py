import json
from typing import List

# Define the class structures matching the JSON data
class Step:
    def __init__(self, step_id: int, temperature_celsius: int, duration_minutes: int, approval_required: bool):
        self.step_id = step_id
        self.temperature_celsius = temperature_celsius
        self.duration_minutes = duration_minutes
        self.approval_required = approval_required

class Brew:
    def __init__(self, brew_id: int, recipe_id: int, recipe_name: str, user_id: str, steps: List[Step]):
        self.brew_id = brew_id
        self.recipe_id = recipe_id
        self.recipe_name = recipe_name
        self.user_id = user_id
        self.steps = steps

# Function to parse JSON data into Brew object
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

# Example JSON data
json_data = '''
{
  "brew_id": 1,
  "recipe_id": 13,
  "recipe_name": "Maredsous",
  "user_id": "ilwejkrfhiuy4o3y4ljkblkdj",
  "step": [
    {
      "step_id": 1,
      "temperature_celsius": 70,
      "duration_minutes": 60,
      "approval_required": false
    },
    {
      "step_id": 2,
      "temperature_celsius": 90,
      "duration_minutes": 30,
      "approval_required": true
    }
  ]
}
'''

# Parse the JSON data
brew = parse_brew(json_data)

# Access the parsed data with titles
print("Brew ID:", brew.brew_id)  # 1
print("Recipe Name:", brew.recipe_name)  # Maredsous
print("Steps:")
for step in brew.steps:
    print(f"  Step ID: {step.step_id}")
    print(f"  Temperature (Celsius): {step.temperature_celsius}")
    print(f"  Duration (Minutes): {step.duration_minutes}")
    print(f"  Approval Required: {step.approval_required}")
    print()  # Blank line for better readability
