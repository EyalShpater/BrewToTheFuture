import requests
import json
import time

BASE_URL = 'http://brewtothefuture.com'  

def send_recipe_step(step):
    url = f"{BASE_URL}/api/recipe_step"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers, data=json.dumps(step))
    return response.json()

def send_recipe(recipe):
    url = f"{BASE_URL}/api/recipe"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers, data=json.dumps(recipe))
    return response.json()

def init_fermentation_request(request):
    url = f"{BASE_URL}/api/init_fermentation"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers, data=json.dumps(request))
    return response.json()

def send_fermentation_report(report):
    url = f"{BASE_URL}/api/fermentation_report"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers, data=json.dumps(report))
    return response.json()

def send_brewing_report(report):
    url = f"{BASE_URL}/api/brewing_report"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers, data=json.dumps(report))
    return response.json()

# Example data
recipe_step = {
    "step_id": 1,
    "temperature_celsius": 70,
    "duration_minutes": 60,
    "approval_required": False
}

recipe = {
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
}

init_request = {
    "brew_id": 1,
    "recipe_id": 13,
    "recipe_name": "Maredsous",
    "user_id": "ilwejkrfhiuy4o3y4ljkblkdj",
    "minutes_between_reports": 120
}

fermentation_report = {
    "brew_id": 1,
    "user_id": "ilwejkrfhiuy4o3y4ljkblkdj",
    "timestamp": int(time.time()),
    "temperature_celsius": 24.5,
    "relative_humidity": 0.3
}

brewing_report = {
    "brew_id": 1,
    "user_id": "ilwejkrfhiuy4o3y4ljkblkdj",
    "timestamp": int(time.time()),
    "temperature_celsius": 24.5,
    "current_step": 4,
    "step_start_time": int(time.time()),
    "status_code": 200,
    "error_message": None
}

# Sending data
print(send_recipe_step(recipe_step))
print(send_recipe(recipe))
print(init_fermentation_request(init_request))
print(send_fermentation_report(fermentation_report))
print(send_brewing_report(brewing_report))
