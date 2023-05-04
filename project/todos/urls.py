from rest_framework import routers
from .views import TodoViewSet

router = routers.DefaultRouter()
router.register(r'api/todo',TodoViewSet,'todos')

urlpatterns = router.urls