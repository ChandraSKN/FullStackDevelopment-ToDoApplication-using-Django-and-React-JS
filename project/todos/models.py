import datetime
from django.db import models

class Todo(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField(default=datetime.date.today)
    time = models.TimeField(default=datetime.time(12, 0))
    status = models.BooleanField(default=False)

   
