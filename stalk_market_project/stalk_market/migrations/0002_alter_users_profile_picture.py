# Generated by Django 4.2 on 2023-04-09 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stalk_market', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='profile_picture',
            field=models.FileField(default='assets/default_profile_pic.jpg', upload_to='assets/profile_pics/'),
        ),
    ]
