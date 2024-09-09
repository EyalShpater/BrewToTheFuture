import requests
import time  # Import the time module

class BrewingSystemAPI:
    def __init__(self, base_url):
        self.base_url = base_url

    def get_recipe_to_brew(self, device_serial_number):
        url = f"{self.base_url}/{device_serial_number}/brew/recipe"
        max_retries = 50
        retry_delay = 10  # Delay between retries in seconds
        print(f"Preparing to fetch recipe from URL: {url}")
        
        for attempt in range(max_retries):
            print(f"Attempt {attempt + 1} of {max_retries}...")
            try:
                response = requests.get(url)
                print(f"Response received: {response}")
                response.raise_for_status()  # Raise an HTTPError for bad responses (4xx, 5xx)
                
                print(f"Recipe data fetched successfully.")
                return response.json()  # Return the response if successful
            
            except requests.exceptions.RequestException as e:
                print(f"Attempt {attempt + 1} failed with error: {e}")
                
                if attempt < max_retries - 1:
                    # Countdown until next retry
                    print(f"Next attempt in {retry_delay} seconds...")
                    for remaining_time in range(retry_delay, 0, -1):
                        print(f"Retrying in {remaining_time} seconds...", end="\r")
                        time.sleep(1)  # Wait for 1 second at a time to update countdown display
                else:
                    print(f"All {max_retries} attempts failed. Raising the exception.")
                    raise  # Re-raise the exception if all retries failed
    def start_brewing(self, device_serial_number, interval):
        url = f"{self.base_url}/{device_serial_number}/brew/start"
        payload = {"interval": interval}
        max_retries = 10
        print(f"Preparing to start brewing at URL: {url} with interval: {interval}")
        
        for attempt in range(max_retries):
            print(f"Attempt {attempt + 1} of {max_retries}...")
            try:
                response = requests.post(url, params=payload)
                print(f"Response received: {response.status_code}")
                response.raise_for_status()  # Raise an HTTPError for bad responses (4xx, 5xx)
                
                print(f"Brewing process started successfully.")
                return response  # Return the response if successful

            except requests.exceptions.RequestException as e:
                print(f"Attempt {attempt + 1} failed with error: {e}")
                
                if attempt < max_retries - 1:
                    print(f"Retrying in 10 seconds...")
                    time.sleep(10)  # Wait for 10 seconds before retrying
                else:
                    print(f"All {max_retries} attempts failed. Raising the exception.")
                    raise  # Re-raise the exception if all retries failed

    def mark_brewing_as_finished(self, device_serial_number):
        url = f"{self.base_url}/{device_serial_number}/brew/recipe/marks_as_completed"
        response = requests.put(url)
        response.raise_for_status()
        return response

    def add_brewing_report(self, device_serial_number, brewing_report):
        url = f"{self.base_url}/{device_serial_number}/report/brewing"
        try:
            response = requests.post(url, json=brewing_report)
            response.raise_for_status()
            return response.json()  # Return the response from the server
        except requests.exceptions.HTTPError as http_err:
            print(f"[ERROR] HTTP error occurred: {http_err}")
            return {"status_code": response.status_code, "error_message": str(http_err)}
        except Exception as err:
            print(f"[ERROR] Other error occurred: {err}")
            return {"status_code": 500, "error_message": str(err)}

    def add_fermentation_report(self, device_serial_number, fermentation_report):
        url = f"{self.base_url}/{device_serial_number}/report/fermentation"
        response = requests.post(url, json=fermentation_report)
        response.raise_for_status()
        return response.json()

# Move this outside the class definition
def create_brewing_report(recipe, step_index, step, current_temp_c, step_start_time, i_status_code):
    """
    Create a brewing report with the current state of the brewing process.
    
    Args:
        recipe (dict): The recipe dictionary that contains brew_id and user_id.
        step_index (int): The current step index (0-based).
        step (dict): The current step dictionary containing step_id, temperature, and other details.
        current_temp_c (float): The current temperature in Celsius.
        step_start_time (int): The time when the step started, in milliseconds.
    
    Returns:
        dict: A dictionary containing the brewing report.
    """
    
    brewing_report = {
        "brew_id": recipe["brew_id"],  # Use the correct brew_id from the recipe
       # "user_id": recipe["user_id"],  # Use the correct user_id from the recipe
        "timestamp": int(time.time() * 1000),  # Current timestamp in milliseconds
        "temperature_celsius": current_temp_c,
        "current_step": step_index + 1,  # Convert to 1-based index
        "step_id": step["step_id"],  # Include the step_id from the current step
        "step_start_time": step_start_time,
        "status_code": i_status_code,  # Assume success unless there's an error
        "error_message": None  # No error by default
    }
    
    return brewing_report
