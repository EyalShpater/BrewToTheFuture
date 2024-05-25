# brew_process.py
import time
import requests
from brew_classes import Brew


def perform_brewing(brew: Brew):
    print(f"Starting brewing process for: {brew.recipe_name}")
    for step in brew.steps:
        print(f"Starting Step {step.step_id}:")
        print(f"  Setting temperature to {step.temperature_celsius}°C")
        print(f"  Maintaining temperature for {step.duration_minutes} minutes...")

        # Simulate the duration of the step (in seconds for simplicity)
        #time.sleep(step.duration_minutes * 60)  # Comment this line if you don't want to actually wait
        time.sleep(step.duration_minutes)  # Comment this line if you don't want to actually wait



        if step.approval_required:
            approval = check_approval()
            while not approval:
                print("  Approval not received. Trying again in 10 seconds...")
                time.sleep(10)
                approval = check_approval()
            print("  Approval received.")

        print(f"  Completed Step {step.step_id}")
        print()

    print(f"Brewing process for {brew.recipe_name} completed!")


def check_approval() -> bool:
    while True:
        try:
            response = requests.get("http://www.google.com", timeout=5)
            if response.status_code == 200:
                return True
        except requests.RequestException:
            pass  # Ignore exception and retry
        print("  Approval not received. Trying again in 10 seconds...")
        time.sleep(10)
