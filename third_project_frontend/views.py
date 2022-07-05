from django.shortcuts import render, redirect
<<<<<<< HEAD
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


def result_view(request):
    return render(request, "result.html")

# 로그인 페이지
=======


def result_view(request):
    # loginUser = request.user
    # if not loginUser.is_authenticated:
    #     return redirect('/sign_in')
    return render(request, 'result.html')
>>>>>>> f0300897c699dc9ac1b6d3295efa3e3ceb0437e2


# @login_required()
@csrf_exempt
def sign_in_view(request):
<<<<<<< HEAD
    return render(request, 'user/signin.html')

=======
    print(request.user)
    loginUser = request.user
    if loginUser.is_authenticated:
        return redirect('/')
    return render(request, 'user/signin.html')
>>>>>>> f0300897c699dc9ac1b6d3295efa3e3ceb0437e2

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
