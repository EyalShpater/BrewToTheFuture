# main.py
import time
from json_parser import parse_brew
from brew_process import perform_brewing
from rest_api import RestAPI

getRecipeUrl = "https://brewtothefuture.azurewebsites.net/1234/api/embedded/brew/recipe"


# Main function to fetch JSON data and perform brewing process
def main():
    api = RestAPI("https://brewtothefuture.azurewebsites.net")
    endpoint = "1234/api/embedded/brew/recipe"

    json_data = api.fetch_json(endpoint)
    while json_data == "":
        json_data = api.fetch_json(endpoint)
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
