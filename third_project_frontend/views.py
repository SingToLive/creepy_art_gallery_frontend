from django.shortcuts import render

def result_view(request):
    return render(request, 'result.html')

def sign_in_view(request):
    return render(request, 'user/signin.html')


def sign_up_view(request):
    return render(request, 'user/signup.html')
