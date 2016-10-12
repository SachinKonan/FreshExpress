from django.db import models

# Create your models here.

class Stop(models.Model):
    stop_number = models.CharField(max_length = 100)
    location = models.CharField(max_length = 100)
    time = models.CharField(max_length = 100)

    def __str__(self):
        return self.location + '-'+ self.time