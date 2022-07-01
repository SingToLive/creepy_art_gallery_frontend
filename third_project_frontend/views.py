from django.shortcuts import render


def sign_in_view(request):
    return render(request, 'user/signin.html')


def sign_up_view(request):
    return render(request, 'user/signup.html')
