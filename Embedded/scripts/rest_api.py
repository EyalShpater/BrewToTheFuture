import requests
import time

class RestAPI:
    def __init__(self, base_url):
        self.base_url = base_url

    def get(self, endpoint, params=None, headers=None):
        url = f"{self.base_url}/{endpoint}"
        response = requests.get(url, params=params, headers=headers)
        return self._handle_response(response)

    def post(self, endpoint, data=None, json=None, headers=None):
        url = f"{self.base_url}/{endpoint}"
        response = requests.post(url, data=data, json=json, headers=headers)
        return self._handle_response(response)

    def put(self, endpoint, data=None, json=None, headers=None):
        url = f"{self.base_url}/{endpoint}"
        response = requests.put(url, data=data, json=json, headers=headers)
        return self._handle_response(response)

    def delete(self, endpoint, headers=None):
        url = f"{self.base_url}/{endpoint}"
        response = requests.delete(url, headers=headers)
        return self._handle_response(response)

    def fetch_json(self, endpoint):
        try:
            response = requests.get(f"{self.base_url}/{endpoint}")
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            print(f"Failed to fetch data: {e}")
            return None

    def _handle_response(self, response):
        try:
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as http_err:
            return {"error": str(http_err), "status_code": response.status_code}
        except requests.exceptions.RequestException as err:
            return {"error": str(err)}
        except ValueError:
            return response.text

    def check_approval(self):
        while True:
            try:
                response = requests.get("http://www.google.com")  # Replace with actual approval URL
                if response.status_code == 200:
                    return True
            except requests.RequestException:
                pass  # Ignore exception and retry
            print("Approval not received. Trying again in 10 seconds...")
            time.sleep(10)


# Usage example
if __name__ == "__main__":
    api = RestAPI("https://brewtothefuture.azurewebsites.net")

    # GET request
    response = api.get("posts")
    print(response)

    # POST request
    new_post = {"title": "foo", "body": "bar", "userId": 1}
    response = api.post("posts", json=new_post)
    print(response)

    # PUT request
    updated_post = {"id": 1, "title": "foo", "body": "bar", "userId": 1}
    response = api.put("posts/1", json=updated_post)
    print(response)

    # DELETE request
    response = api.delete("posts/1")
    print(response)

    # Fetch JSON data
    json_response = api.fetch_json("1234/api/embedded/brew/recipe")
    print(json_response)
