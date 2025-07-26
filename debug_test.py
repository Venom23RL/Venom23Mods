#!/usr/bin/env python3
import requests

BASE_URL = "https://6c6c289c-6262-4eee-85aa-07a174b30c6c.preview.emergentagent.com/api"

def test_biography():
    print("Testing Biography API...")
    response = requests.get(f"{BASE_URL}/biography")
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"Data: {data}")
        
        required_fields = ["id", "name", "title", "bio", "tagline", "updated_at"]
        print(f"Required fields present: {all(field in data for field in required_fields)}")
        
        name = data.get("name")
        print(f"Name: {repr(name)}")
        print(f"Name is string: {isinstance(name, str)}")
        print(f"Name length: {len(name) if name else 0}")
        print(f"Name length > 0: {len(name) > 0 if name else False}")
        
        if isinstance(name, str) and len(name) > 0:
            print("✅ Biography test PASSED")
        else:
            print("❌ Biography test FAILED")

if __name__ == "__main__":
    test_biography()