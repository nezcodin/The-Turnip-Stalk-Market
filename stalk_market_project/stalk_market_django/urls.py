"""
URL configuration for stalk_market_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.conf.urls import include
from django.urls import path
from django.contrib import admin 
from stalk_market.views import PostPicsView, GetImageView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('stalk_market.urls')),
    path('media/', PostPicsView.as_view()),
    path('media/<str:image_name>/', GetImageView.as_view(), name='get_image'),
    path('media/assets/<str:image_name>/', GetImageView.as_view(), name='default_profile'),
]
