import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.contrib.auth.models import User


class AuthUserAPITest(APITestCase):
    def setUp(self):
        self.user_1 = "test_1"
        self.email_1 = "test_1@example.com",
        self.password = "Password12345"
        self.login_data = {
            "username": self.user_1,
            "password": self.password
        }
        self.test_user = User.objects.create_user(
            username=self.user_1,
            password=self.password
        )
        self.login_url = reverse("token_obtain_pair")
        self.client = APIClient()

    def test_get_tokens_pair(self):
        response = self.client.post(self.login_url, data=self.login_data)
        data = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertListEqual(list(data.keys()), ['refresh', 'access'])
        self.assertIsNotNone(data.get('access'))
        self.assertIsNotNone(data.get('refresh'))

    def test_wrong_login_data(self):
        wrong = {
            "username": self.user_1,
            "password": "wrong_password"
        }
        response = self.client.post(self.login_url, data=wrong)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertDictEqual(
            response.json(), {'detail': 'No active account found with the given credentials'}
        )

    def test_empty_login(self):
        response = self.client.post(self.login_url, data={})
        data = response.json()
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(data.get('username')[0], 'This field is required.')
        self.assertEqual(data.get('password')[0], 'This field is required.')
