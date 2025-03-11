import requests

BASE_URL = "http://localhost:3000"

def test_get_orders():
    response = requests.get(f"{BASE_URL}/orders")
    assert response.status_code == 200



# import requests

# BASE_URL = "http://localhost:3000"  # Replace with your actual URL
# HEADERS = {
#     "Content-Type": "application/json",
#     "Authorization": "Helloformjwt"  # Replace with a valid token
# }

# def test_create_order():
#     payload = {
#         "customerId": 1,
#         "products": [ 2],
#         "quantity": 5,
#         "status": "pending"
#     }
#     response = requests.post(f"{BASE_URL}/orders", json=payload, headers=HEADERS)
#     assert response.status_code == 201
#     assert response.json()["status"] == "pending"

# def test_get_orders():
#     response = requests.get(f"{BASE_URL}/orders", headers=HEADERS)
#     assert response.status_code == 200
#     assert isinstance(response.json(), list)

# def test_update_order():
#     order_id = 1  # Change to an actual order ID from your system
#     payload = {"status": "shipped"}
#     response = requests.put(f"{BASE_URL}/orders/{order_id}", json=payload, headers=HEADERS)
#     assert response.status_code == 200
#     assert response.json()["status"] == "shipped"

# def test_delete_order():
#     order_id = 1  # Change to an actual order ID from your system
#     response = requests.delete(f"{BASE_URL}/orders/{order_id}", headers=HEADERS)
#     assert response.status_code == 200
