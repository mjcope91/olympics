from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .model import SessionMaker, StreamGage
from tethys_gizmos.gizmo_options import MapView, MVLayer, MVView, TextInput


@login_required()
def home(request):
    """
    Controller for the app home page.
    """
    context = {}

    return render(request, 'my_first_app/home.html', context)

def map(request):
    """
    Controller for map page.
    """
    # Pass variables to the template via the context dictionary
    context = {}

    return render(request, 'my_first_app/map.html', context)

def echo_name(request):
    """
    Controller that will echo the name provided by the user via a form.
    """
    # Default value for name
    name = ''

    # Define Gizmo Options
    text_input_options = TextInput(display_text='Enter Name',
                                   name='name-input')

    # Check form data
    if request.POST and 'name-input' in request.POST:
       name = request.POST['name-input']

    # Create template context dictionary
    context = {'name': name,
               'text_input_options': text_input_options}

    return render(request, 'my_first_app/echo_name.html', context)