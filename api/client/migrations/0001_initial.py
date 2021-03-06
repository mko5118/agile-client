# Generated by Django 3.0.6 on 2020-05-27 16:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('email', models.EmailField(blank=True, max_length=50)),
                ('phone_number', models.CharField(blank=True, max_length=50)),
                ('job_title', models.CharField(blank=True, max_length=100)),
                ('notes', models.TextField(blank=True, max_length=1500)),
            ],
        ),
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=50)),
                ('details', models.TextField(blank=True, max_length=1500)),
                ('log_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('associated_client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='client.Client')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=50)),
                ('website', models.CharField(blank=True, max_length=100)),
                ('company_number', models.CharField(blank=True, max_length=50)),
                ('address', models.CharField(blank=True, max_length=150)),
                ('company_notes', models.TextField(blank=True, max_length=1500)),
                ('associated_client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='client.Client')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='client',
            name='client_company',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='client.Company'),
        ),
        migrations.AddField(
            model_name='client',
            name='logs',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='client.Log'),
        ),
        migrations.AddField(
            model_name='client',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
