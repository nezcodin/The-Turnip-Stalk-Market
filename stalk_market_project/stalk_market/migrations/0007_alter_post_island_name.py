# Generated by Django 4.2 on 2023-04-14 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stalk_market', '0006_alter_post_island_name_alter_post_post_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='island_name',
            field=models.CharField(max_length=10),
        ),
    ]