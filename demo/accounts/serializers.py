from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class CreateUserSerializer(serializers.ModelSerializer):
    """
        Serializer for user registration
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email','password')
        extra_kwargs = {'password': {'write_only': True}}

    # override `create` method
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'])
        return user

class UserSerializer(serializers.ModelSerializer):
    """
        User serializer
    """
    class Meta:
        model = User
        fields = ('id','username', 'email')

class LoginUserSerializer(serializers.Serializer):
    """
    Serializer to login user
    """
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data) # unpack kwargs of `data`
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Credentials.")

