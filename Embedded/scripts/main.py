# main.py
import time
import requests
from json_parser import parse_brew
from brew_process import perform_brewing
import json


# Fetch JSON data from the brew server
def fetch_json(url: str) -> str:
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Failed to fetch data: {e}")
        return None

getRecipeUrl = "https://brewtothefuture.azurewebsites.net/1234/api/embedded/brew/recipe"

# Main function to fetch JSON data and perform brewing process
def main():
    json_data = fetch_json(getRecipeUrl)
    while json_data == "":
        json_data = fetch_json(getRecipeUrl)
        if json_data == "":
            print("Failed to fetch JSON data. Retrying in 5 seconds...")
            time.sleep(5)
        else:
            print("JSON data fetched successfully.")

    if json_data != "":
        brew = parse_brew(json_data)
        perform_brewing(brew)

if __name__ == "__main__":
    main()



