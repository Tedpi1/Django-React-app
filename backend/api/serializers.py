from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id", "username", "password"]
        extra_kwargs={"password":{"write_only": True}} 
# means password is collected wen creating new user 
# and ensure its hidden when giving information to user

    def create(self, validated_data):
        user=User.objects.create_user(**validated_data)
        return user
    #a method used to create a user
    #validated data refers to the data that has pass through the serializer
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields=["id","title","content","created_at","author"]
        extra_kwargs={"autho":{"read_only": True}}
        