# Generated by Django 3.0.4 on 2020-03-28 21:22

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('calorie', '0005_userportion_date'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='daycalories',
            unique_together={('user', 'day')},
        ),
    ]
