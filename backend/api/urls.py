from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreateView.as_view(), name="list-note"),
    path("notes/delete/<str:pk>/", views.Notedelete.as_view(), name="delete-note"),
]
