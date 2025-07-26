#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Ladypi89 Website
Tests all CRUD operations for Biography, Partnerships, Social Media, Contact Forms, and Streaming Status
"""

import requests
import json
import uuid
from datetime import datetime
import sys

# Use the production URL from frontend/.env
BASE_URL = "https://6c6c289c-6262-4eee-85aa-07a174b30c6c.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.test_results = {
            "mongodb_models": {"passed": 0, "failed": 0, "errors": []},
            "biography_api": {"passed": 0, "failed": 0, "errors": []},
            "partnerships_api": {"passed": 0, "failed": 0, "errors": []},
            "social_media_api": {"passed": 0, "failed": 0, "errors": []},
            "contact_form_api": {"passed": 0, "failed": 0, "errors": []},
            "streaming_status_api": {"passed": 0, "failed": 0, "errors": []},
            "status_api": {"passed": 0, "failed": 0, "errors": []}
        }
        
    def log_result(self, category, test_name, success, error_msg=None):
        """Log test results"""
        if success:
            self.test_results[category]["passed"] += 1
            print(f"✅ {test_name}")
        else:
            self.test_results[category]["failed"] += 1
            self.test_results[category]["errors"].append(f"{test_name}: {error_msg}")
            print(f"❌ {test_name}: {error_msg}")
    
    def test_status_api(self):
        """Test the basic status API endpoints"""
        print("\n🔍 Testing Status API...")
        
        # Test GET /api/status
        try:
            response = requests.get(f"{self.base_url}/status")
            if response.status_code == 200:
                self.log_result("status_api", "GET /api/status", True)
            else:
                self.log_result("status_api", "GET /api/status", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("status_api", "GET /api/status", False, str(e))
        
        # Test POST /api/status
        try:
            test_data = {"client_name": "LadyPi89_Test_Client"}
            response = requests.post(f"{self.base_url}/status", json=test_data)
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "client_name" in data:
                    self.log_result("status_api", "POST /api/status", True)
                else:
                    self.log_result("status_api", "POST /api/status", False, "Missing required fields in response")
            else:
                self.log_result("status_api", "POST /api/status", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("status_api", "POST /api/status", False, str(e))
    
    def test_biography_api(self):
        """Test Biography CRUD operations"""
        print("\n🔍 Testing Biography API...")
        
        # Test GET /api/biography (should return default data)
        try:
            response = requests.get(f"{self.base_url}/biography")
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "name", "title", "bio", "tagline", "updated_at"]
                if all(field in data for field in required_fields):
                    # Check if we have valid biography data structure
                    if isinstance(data["name"], str) and len(data["name"]) > 0:
                        self.log_result("biography_api", "GET /api/biography", True)
                    else:
                        self.log_result("biography_api", "GET /api/biography", False, "Biography name is invalid")
                else:
                    self.log_result("biography_api", "GET /api/biography", False, f"Missing required fields: {required_fields}")
            else:
                self.log_result("biography_api", "GET /api/biography", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("biography_api", "GET /api/biography", False, str(e))
        
        # Test PUT /api/biography
        try:
            update_data = {
                "name": "LadyPi89 Updated",
                "title": "Professional Rocket League Streamer",
                "bio": "Updated bio for testing purposes",
                "tagline": "Updated tagline for testing"
            }
            response = requests.put(f"{self.base_url}/biography", json=update_data)
            if response.status_code == 200:
                data = response.json()
                if data["name"] == update_data["name"] and data["title"] == update_data["title"]:
                    self.log_result("biography_api", "PUT /api/biography", True)
                else:
                    self.log_result("biography_api", "PUT /api/biography", False, "Update data not reflected in response")
            else:
                self.log_result("biography_api", "PUT /api/biography", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("biography_api", "PUT /api/biography", False, str(e))
    
    def test_partnerships_api(self):
        """Test Partnerships CRUD operations"""
        print("\n🔍 Testing Partnerships API...")
        
        # Test GET /api/partnerships (should return default partnerships)
        try:
            response = requests.get(f"{self.base_url}/partnerships")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) >= 2:
                    # Check for default partnerships
                    partnership_names = [p["name"] for p in data]
                    if "Sin Frenos League" in partnership_names and "ClaveCD" in partnership_names:
                        self.log_result("partnerships_api", "GET /api/partnerships with default data", True)
                    else:
                        self.log_result("partnerships_api", "GET /api/partnerships", False, "Default partnerships not found")
                else:
                    self.log_result("partnerships_api", "GET /api/partnerships", False, "Expected list with default partnerships")
            else:
                self.log_result("partnerships_api", "GET /api/partnerships", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("partnerships_api", "GET /api/partnerships", False, str(e))
        
        # Test POST /api/partnerships
        test_partnership_id = None
        try:
            new_partnership = {
                "name": "Test Gaming Partnership",
                "role": "Content Creator",
                "logo": "🎮",
                "handle": "@testpartner",
                "url": "https://testpartner.com"
            }
            response = requests.post(f"{self.base_url}/partnerships", json=new_partnership)
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data["name"] == new_partnership["name"]:
                    test_partnership_id = data["id"]
                    self.log_result("partnerships_api", "POST /api/partnerships", True)
                else:
                    self.log_result("partnerships_api", "POST /api/partnerships", False, "Created partnership data mismatch")
            else:
                self.log_result("partnerships_api", "POST /api/partnerships", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("partnerships_api", "POST /api/partnerships", False, str(e))
        
        # Test PUT /api/partnerships/{id}
        if test_partnership_id:
            try:
                update_data = {
                    "name": "Updated Test Partnership",
                    "role": "Senior Content Creator"
                }
                response = requests.put(f"{self.base_url}/partnerships/{test_partnership_id}", json=update_data)
                if response.status_code == 200:
                    data = response.json()
                    if data["name"] == update_data["name"]:
                        self.log_result("partnerships_api", "PUT /api/partnerships/{id}", True)
                    else:
                        self.log_result("partnerships_api", "PUT /api/partnerships/{id}", False, "Update not reflected")
                else:
                    self.log_result("partnerships_api", "PUT /api/partnerships/{id}", False, f"Status code: {response.status_code}")
            except Exception as e:
                self.log_result("partnerships_api", "PUT /api/partnerships/{id}", False, str(e))
        
        # Test DELETE /api/partnerships/{id}
        if test_partnership_id:
            try:
                response = requests.delete(f"{self.base_url}/partnerships/{test_partnership_id}")
                if response.status_code == 200:
                    self.log_result("partnerships_api", "DELETE /api/partnerships/{id}", True)
                else:
                    self.log_result("partnerships_api", "DELETE /api/partnerships/{id}", False, f"Status code: {response.status_code}")
            except Exception as e:
                self.log_result("partnerships_api", "DELETE /api/partnerships/{id}", False, str(e))
    
    def test_social_media_api(self):
        """Test Social Media CRUD operations"""
        print("\n🔍 Testing Social Media API...")
        
        # Test GET /api/social-media (should return default social media)
        try:
            response = requests.get(f"{self.base_url}/social-media")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) >= 7:
                    # Check for default platforms
                    platforms = [s["platform"] for s in data]
                    expected_platforms = ["Twitch", "TikTok", "Twitter", "YouTube", "Instagram", "Discord", "ClaveCD"]
                    if all(platform in platforms for platform in expected_platforms):
                        self.log_result("social_media_api", "GET /api/social-media with default data", True)
                    else:
                        self.log_result("social_media_api", "GET /api/social-media", False, f"Missing expected platforms: {expected_platforms}")
                else:
                    self.log_result("social_media_api", "GET /api/social-media", False, "Expected list with default social media")
            else:
                self.log_result("social_media_api", "GET /api/social-media", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("social_media_api", "GET /api/social-media", False, str(e))
        
        # Test POST /api/social-media
        test_social_id = None
        try:
            new_social = {
                "platform": "Test Platform",
                "url": "https://testplatform.com/ladypi89",
                "icon": "test-icon",
                "color": "#ff6600"
            }
            response = requests.post(f"{self.base_url}/social-media", json=new_social)
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data["platform"] == new_social["platform"]:
                    test_social_id = data["id"]
                    self.log_result("social_media_api", "POST /api/social-media", True)
                else:
                    self.log_result("social_media_api", "POST /api/social-media", False, "Created social media data mismatch")
            else:
                self.log_result("social_media_api", "POST /api/social-media", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("social_media_api", "POST /api/social-media", False, str(e))
        
        # Test PUT /api/social-media/{id}
        if test_social_id:
            try:
                update_data = {
                    "platform": "Updated Test Platform",
                    "color": "#00ff66"
                }
                response = requests.put(f"{self.base_url}/social-media/{test_social_id}", json=update_data)
                if response.status_code == 200:
                    data = response.json()
                    if data["platform"] == update_data["platform"]:
                        self.log_result("social_media_api", "PUT /api/social-media/{id}", True)
                    else:
                        self.log_result("social_media_api", "PUT /api/social-media/{id}", False, "Update not reflected")
                else:
                    self.log_result("social_media_api", "PUT /api/social-media/{id}", False, f"Status code: {response.status_code}")
            except Exception as e:
                self.log_result("social_media_api", "PUT /api/social-media/{id}", False, str(e))
        
        # Test DELETE /api/social-media/{id}
        if test_social_id:
            try:
                response = requests.delete(f"{self.base_url}/social-media/{test_social_id}")
                if response.status_code == 200:
                    self.log_result("social_media_api", "DELETE /api/social-media/{id}", True)
                else:
                    self.log_result("social_media_api", "DELETE /api/social-media/{id}", False, f"Status code: {response.status_code}")
            except Exception as e:
                self.log_result("social_media_api", "DELETE /api/social-media/{id}", False, str(e))
    
    def test_contact_form_api(self):
        """Test Contact Form API operations"""
        print("\n🔍 Testing Contact Form API...")
        
        # Test POST /api/contact
        test_contact_id = None
        try:
            contact_data = {
                "name": "María González",
                "email": "maria.gonzalez@example.com",
                "message": "Hola LadyPi89! Me encanta tu contenido de Rocket League. ¿Podrías hacer más tutoriales?"
            }
            response = requests.post(f"{self.base_url}/contact", json=contact_data)
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data["email"] == contact_data["email"]:
                    test_contact_id = data["id"]
                    self.log_result("contact_form_api", "POST /api/contact", True)
                else:
                    self.log_result("contact_form_api", "POST /api/contact", False, "Contact form data mismatch")
            else:
                self.log_result("contact_form_api", "POST /api/contact", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("contact_form_api", "POST /api/contact", False, str(e))
        
        # Test GET /api/contact
        try:
            response = requests.get(f"{self.base_url}/contact")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("contact_form_api", "GET /api/contact", True)
                else:
                    self.log_result("contact_form_api", "GET /api/contact", False, "Expected list of contact forms")
            else:
                self.log_result("contact_form_api", "GET /api/contact", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("contact_form_api", "GET /api/contact", False, str(e))
        
        # Test PUT /api/contact/{id}/status
        if test_contact_id:
            try:
                response = requests.put(f"{self.base_url}/contact/{test_contact_id}/status?status=read")
                if response.status_code == 200:
                    self.log_result("contact_form_api", "PUT /api/contact/{id}/status", True)
                else:
                    self.log_result("contact_form_api", "PUT /api/contact/{id}/status", False, f"Status code: {response.status_code}")
            except Exception as e:
                self.log_result("contact_form_api", "PUT /api/contact/{id}/status", False, str(e))
    
    def test_streaming_status_api(self):
        """Test Streaming Status API operations"""
        print("\n🔍 Testing Streaming Status API...")
        
        # Test GET /api/streaming-status (should return default status)
        try:
            response = requests.get(f"{self.base_url}/streaming-status")
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "platform", "url", "status", "game", "updated_at"]
                if all(field in data for field in required_fields):
                    # Check if we have valid streaming status data structure
                    if data["platform"] == "Twitch" and isinstance(data["game"], str):
                        self.log_result("streaming_status_api", "GET /api/streaming-status", True)
                    else:
                        self.log_result("streaming_status_api", "GET /api/streaming-status", False, "Streaming status data structure invalid")
                else:
                    self.log_result("streaming_status_api", "GET /api/streaming-status", False, f"Missing required fields: {required_fields}")
            else:
                self.log_result("streaming_status_api", "GET /api/streaming-status", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("streaming_status_api", "GET /api/streaming-status", False, str(e))
        
        # Test PUT /api/streaming-status
        try:
            response = requests.put(f"{self.base_url}/streaming-status?status=streaming&game=Rocket League Tournament")
            if response.status_code == 200:
                data = response.json()
                if data["status"] == "streaming" and data["game"] == "Rocket League Tournament":
                    self.log_result("streaming_status_api", "PUT /api/streaming-status", True)
                else:
                    self.log_result("streaming_status_api", "PUT /api/streaming-status", False, "Update not reflected in response")
            else:
                self.log_result("streaming_status_api", "PUT /api/streaming-status", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("streaming_status_api", "PUT /api/streaming-status", False, str(e))
    
    def test_mongodb_models(self):
        """Test MongoDB models by verifying data structure and validation"""
        print("\n🔍 Testing MongoDB Models...")
        
        # Test Biography model validation through API
        try:
            # Test with invalid email (should fail gracefully)
            invalid_bio = {"name": "", "title": "", "bio": "", "tagline": ""}
            response = requests.put(f"{self.base_url}/biography", json=invalid_bio)
            # Should still work as fields are optional in update
            if response.status_code in [200, 422]:  # 422 for validation error is also acceptable
                self.log_result("mongodb_models", "Biography model validation", True)
            else:
                self.log_result("mongodb_models", "Biography model validation", False, f"Unexpected status: {response.status_code}")
        except Exception as e:
            self.log_result("mongodb_models", "Biography model validation", False, str(e))
        
        # Test Contact form email validation
        try:
            invalid_contact = {
                "name": "Test User",
                "email": "invalid-email",
                "message": "Test message"
            }
            response = requests.post(f"{self.base_url}/contact", json=invalid_contact)
            if response.status_code == 422:  # Should fail validation
                self.log_result("mongodb_models", "Contact form email validation", True)
            else:
                self.log_result("mongodb_models", "Contact form email validation", False, f"Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_result("mongodb_models", "Contact form email validation", False, str(e))
        
        # Test URL validation in social media
        try:
            invalid_social = {
                "platform": "Test",
                "url": "not-a-valid-url",
                "icon": "test",
                "color": "#000000"
            }
            response = requests.post(f"{self.base_url}/social-media", json=invalid_social)
            if response.status_code == 422:  # Should fail validation
                self.log_result("mongodb_models", "Social media URL validation", True)
            else:
                self.log_result("mongodb_models", "Social media URL validation", False, f"Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_result("mongodb_models", "Social media URL validation", False, str(e))
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Comprehensive Backend API Testing for Ladypi89 Website")
        print(f"🌐 Testing against: {self.base_url}")
        print("=" * 80)
        
        # Run all test suites
        self.test_status_api()
        self.test_mongodb_models()
        self.test_biography_api()
        self.test_partnerships_api()
        self.test_social_media_api()
        self.test_contact_form_api()
        self.test_streaming_status_api()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test results summary"""
        print("\n" + "=" * 80)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 80)
        
        total_passed = 0
        total_failed = 0
        
        for category, results in self.test_results.items():
            passed = results["passed"]
            failed = results["failed"]
            total_passed += passed
            total_failed += failed
            
            status = "✅ PASS" if failed == 0 else "❌ FAIL"
            print(f"{category.upper().replace('_', ' ')}: {status} ({passed} passed, {failed} failed)")
            
            if results["errors"]:
                for error in results["errors"]:
                    print(f"  ❌ {error}")
        
        print("\n" + "=" * 80)
        print(f"🎯 OVERALL RESULTS: {total_passed} PASSED, {total_failed} FAILED")
        
        if total_failed == 0:
            print("🎉 ALL TESTS PASSED! Backend API is working correctly.")
        else:
            print(f"⚠️  {total_failed} tests failed. Please review the errors above.")
        
        print("=" * 80)
        
        return total_failed == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)