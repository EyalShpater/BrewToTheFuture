# main.py
import requests
from json_parser import parse_brew
from brew_process import perform_brewing
import json

recipes = [
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
                "approval_required": False
            },
            {
                "step_id": 2,
                "temperature_celsius": 90,
                "duration_minutes": 30,
                "approval_required": True
            }
        ]
    },
    {
        "brew_id": 2,
        "recipe_id": 14,
        "recipe_name": "Belgian Dubbel",
        "user_id": "ilwejkrfhiuy4o3y4ljkblkdj",
        "step": [
            {
                "step_id": 1,
                "temperature_celsius": 65,
                "duration_minutes": 60,
                "approval_required": False
            },
            {
                "step_id": 2,
                "temperature_celsius": 78,
                "duration_minutes": 45,
                "approval_required": True
            }
        ]
    },
    {
        "brew_id": 3,
        "recipe_id": 15,
        "recipe_name": "American IPA",
        "user_id": "ilwejkrfhiuy4o3y4ljkblkdj",
        "step": [
            {
                "step_id": 1,
                "temperature_celsius": 68,
                "duration_minutes": 60,
                "approval_required": False
            },
            {
                "step_id": 2,
                "temperature_celsius": 72,
                "duration_minutes": 30,
                "approval_required": True
            }
        ]
    },
    {
        "brew_id": 4,
        "recipe_id": 16,
        "recipe_name": "Stout",
        "user_id": "ilwejkrfhiuy4o3y4ljkblkdj",
        "step": [
            {
                "step_id": 1,
                "temperature_celsius": 70,
                "duration_minutes": 60,
                "approval_required": False
            },
            {
                "step_id": 2,
                "temperature_celsius": 75,
                "duration_minutes": 45,
                "approval_required": True
            }
        ]
    }
]




# Fetch JSON data from the internet
def fetch_json(url: str) -> str:
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Failed to fetch data: {e}")
        return None

# Example URL (Google as a placeholder, replace with actual URL when available)
url = "https://www.google.com"

# Main program logic
def main():
    #json_data = fetch_json(url)



    # Example JSON data
    chosen_recipe = recipes[2]  # For example, selecting the first recipe
    json_data = json.dumps(chosen_recipe)


    if json_data:
        brew = parse_brew(json_data)
        perform_brewing(brew)

if __name__ == "__main__":
    main()



