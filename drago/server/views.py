from django.shortcuts import render


from rest_framework.views import APIView                
from rest_framework.response import Response            
from rest_framework.permissions import IsAuthenticated  #for token-based authentication

# Create your views here.

class HelloView(APIView):
    #Let's protect this class to require authentication
    permission_classes = (IsAuthenticated,)

    #'GET' method
    def get(self, request):
        content = {'message', 'Hello, World!'}
        return Response(content)

