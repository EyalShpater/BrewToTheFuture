import time
from brew_classes import Brew, Step
from rest_api import RestAPI
from StatusCodes import StatusCodes

api = RestAPI("http://brewtothefuture.azurewebsites.net")
putRecipeUrl = "1234/api/embedded/brew/recipe/marks_as_completed"
time_to_wait_for_approval = 10  # Time in seconds to wait for approval
device_serial_number = "1234567890"  # Placeholder for the device serial number
time_to_check_temperature = 1  # Time in seconds to check the temperature
reporting_interval = 1  # Time in seconds to report the temperature

def perform_brewing(brew: Brew):
    print(f"\nStarting brewing process for: {brew.recipe_name}")
    for step in brew.steps:
        perform_step(step)

    # Send a PUT request to the server to indicate that the brewing process is complete
    send_status_to_server(StatusCodes.OK, "Brewing process completed successfully")


def perform_step(step: Step):
    print(f"Starting Step {step.step_id}:")
    print(f"  Setting temperature to {step.temperature_celsius}°C")

    maintain_temperature(step)

    if step.approval_required:
        send_status_to_server(StatusCodes.STEP_COMPLETED_AND_WAIT, f"Step {step.step_id} completed and waiting for approval")
        check_and_wait_for_approval()

    send_status_to_server(StatusCodes.STEP_COMPLETED, f"Step {step.step_id} completed successfully")
    print(f"  Completed Step {step.step_id}\n")


def check_and_wait_for_approval():
    approval = api.check_approval()
    while not approval:
        print(f"  Approval not received. Trying again in {time_to_wait_for_approval} seconds...")
        time.sleep(time_to_wait_for_approval)
        approval = api.check_approval()
    print("  Approval received.")
    send_status_to_server(StatusCodes.OK, "Approval received, proceeding to the next step")


def set_temperature(current_temperature: int, target_temperature: int):
    if current_temperature < target_temperature:
        turn_on_heating()
    else:
        turn_off_heating()


def turn_on_heating():
    # Simulate turning on the heating element
    print("Heating element ON")


def turn_off_heating():
    # Simulate turning off the heating element
    print("Heating element OFF")


def maintain_temperature(step: Step):
    print(f"Maintaining temperature at {step.temperature_celsius}°C for {step.duration_minutes} minutes")
    duration_seconds = step.duration_minutes * 60
    start_time = time.time()
    last_report_time = start_time

    while time.time() - start_time < duration_seconds:
        # Simulate checking the actual hardware temperature
        current_temperature = get_current_temperature()

        # Adjust temperature by turning the heating element on or off
        set_temperature(current_temperature, step.temperature_celsius)

        # Report the temperature at the specified interval
        current_time = time.time()
        if current_time - last_report_time >= reporting_interval:
            send_status_to_server(StatusCodes.OK, f"Temperature reported: {current_temperature}°C")
            last_report_time = current_time

        time.sleep(time_to_check_temperature)  # Check temperature every second


def send_status_to_server(status_code, message):
    status_data = {
        "device_serial_number": device_serial_number,
        "status_code": status_code,
        "message": message,
        "timestamp": time.time()
    }
    response = api.post(f"api/embedded/{device_serial_number}/status", status_data)
    print(f"Sent status {status_code}: {message}. Server response: {response}")


def get_current_temperature():
    # Simulate getting the current temperature from hardware
    # Replace with actual hardware interaction code
    return 70  # Placeholder for current temperature reading


# Example usage:
# steps = [
#     Step(step_id=1, temperature_celsius=65, duration_minutes=10, approval_required=False),
#     Step(step_id=2, temperature_celsius=72, duration_minutes=30, approval_required=True)
# ]
# brew = Brew(brew_id=1, recipe_id=101, recipe_name="Classic Ale", user_id="user123", steps=steps)
# perform_brewing(brew)
