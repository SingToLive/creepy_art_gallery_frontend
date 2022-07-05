from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect


def result_view(request):
    return render(request, "result.html")

# @login_required()


@csrf_exempt
def sign_in_view(request):
    return render(request, 'user/signin.html')


# 회원가입 페이지
@csrf_exempt
def sign_up_view(request):
    if request.method == 'GET':
        return render(request, "user/signup.html")

    elif request.method == 'POST':
        user_id = request.POST.get('user_id', '')
        password = request.POST.get('password', '')
        password_check = request.POST.get('password_check', '')
        username = request.POST.get('username', '')


def main_view(request):
    return render(request, "main.html")
