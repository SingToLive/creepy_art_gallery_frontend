from django.shortcuts import render, redirect


def result_view(request):
    # loginUser = request.user
    # if not loginUser.is_authenticated:
    #     return redirect('/sign_in')
    return render(request, 'result.html')

def sign_in_view(request):
    print(request.user)
    loginUser = request.user
    if loginUser.is_authenticated:
        return redirect('/')
    return render(request, 'user/signin.html')

def sign_up_view(request):
    return render(request, "user/signup.html")


def main_view(request):
    return render(request, "main.html")
