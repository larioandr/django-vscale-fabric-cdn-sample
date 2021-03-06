from django.forms import ModelForm

from .widgets import CustomFileInput
from .models import Note


class NoteUpdateForm(ModelForm):
    class Meta:
        model = Note
        exclude = ('owner',)
        widgets = {
            'document': CustomFileInput(attrs={
                'accept': '.pdf',
                'show_file_name': True,
                'btn_class': 'btn-outline-secondary'
            }),
        }
