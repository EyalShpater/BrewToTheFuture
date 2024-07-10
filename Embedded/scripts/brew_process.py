import time
from brew_classes import Brew
from rest_api import RestAPI

# Initialize RestAPI with the base URL
api = RestAPI("http://brewtothefuture.azurewebsites.net")

putRecipeUrl = "1234/api/embedded/brew/recipe/marks_as_completed"

def perform_brewing(brew: Brew):
    print(f"\nStarting brewing process for: {brew.recipe_name}")
    for step in brew.steps:
        print(f"Starting Step {step.step_id}:")
        print(f"  Setting temperature to {step.temperature_celsius}°C")
        print(f"  Maintaining temperature for {step.duration_minutes} minutes...")

        # Simulate the duration of the step (in seconds for simplicity)
        # time.sleep(step.duration_minutes * 60)  # Uncomment this line for real wait
        time.sleep(2)  # Simulated wait

        if step.approval_required:
            approval = api.check_approval()
            while not approval:
                print("  Approval not received. Trying again in 10 seconds...")
                time.sleep(10)
                approval = api.check_approval()
            print("  Approval received.")

        print(f"  Completed Step {step.step_id}")
        print()

    # Send a PUT request to the server to indicate that the brewing process is complete
    server_response = api.put(putRecipeUrl)
    print(f"Brewing process for {brew.recipe_name} completed! Response: {server_response}")
