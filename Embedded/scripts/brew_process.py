# brew_process.py
import time
import requests
from brew_classes import Brew


putRecipeUrl = "http://brewtothefuture.azurewebsites.net/1234/api/embedded/brew/recipe/marks_as_completed"

def perform_brewing(brew: Brew):
    print(f"\nStarting brewing process for: {brew.recipe_name}")
    for step in brew.steps:
        print(f"Starting Step {step.step_id}:")
        print(f"  Setting temperature to {step.temperature_celsius}°C")
        print(f"  Maintaining temperature for {step.duration_minutes} minutes...")

        # Simulate the duration of the step (in seconds for simplicity)
        #time.sleep(step.duration_minutes * 60)  # Comment this line if you don't want to actually wait

        #time.sleep(step.duration_minutes)  # Comment this line if you don't want to actually wait

        time.sleep(2)


        if step.approval_required:
            approval = check_approval()
            while not approval:
                print("  Approval not received. Trying again in 10 seconds...")
                time.sleep(10)
                approval = check_approval()
            print("  Approval received.")

        print(f"  Completed Step {step.step_id}")
        print()

    # Send a PUT request to the server to indicate that the brewing process is complete
    server_response = make_put_request(putRecipeUrl)
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


def make_put_request(url, headers=None, data=None, params=None):
    """
    Make a PUT request to the specified URL with optional headers, data, and params.

    :param url: The URL to send the PUT request to.
    :param headers: Optional dictionary of HTTP headers to send with the request.
    :param data: Optional data to include in the body of the PUT request.
    :param params: Optional dictionary of URL parameters to append to the URL.
    :return: Response object from the PUT request.
    """
    try:
        response = requests.put(url, headers=headers, data=data, params=params)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        print('PUT request was successful.')
        return response
    except requests.exceptions.HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')
    except Exception as err:
        print(f'An error occurred: {err}')