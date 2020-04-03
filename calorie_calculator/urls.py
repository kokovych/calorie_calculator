"""calorie_calculator URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from calorie.views import index
from calorie.api import HelloView


react_routes = getattr(settings, 'REACT_ROUTES', [])

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/hello/', HelloView.as_view(), name='hello'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify')
]

for route in react_routes:
    urlpatterns += [
        path('{}/'.format(route), TemplateView.as_view(template_name='index.html'))
    ]
