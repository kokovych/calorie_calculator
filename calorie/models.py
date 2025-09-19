from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

# Create your models here.


FOOD_TYPE_TIME = (
    (1, "Сніданок"),
    (2, "Обід"),
    (3, "Вечеря"),
    (4, "Перекус"),
)



def default_eating():
    now = timezone.localtime().time()
    if now >= timezone.datetime.strptime("06:00", "%H:%M").time() and now <= timezone.datetime.strptime("10:00", "%H:%M").time():
        return 1  # Сніданок
    elif now >= timezone.datetime.strptime("12:00", "%H:%M").time() and now <= timezone.datetime.strptime("14:00", "%H:%M").time():
        return 2  # Обід
    elif now >= timezone.datetime.strptime("17:00", "%H:%M").time() and now <= timezone.datetime.strptime("20:00", "%H:%M").time():
        return 3  # Вечеря
    return 4  # Перекус


class Product(models.Model):
    title = models.CharField(max_length=256)
    calories = models.FloatField(default=0)
    added_day = models.DateTimeField(auto_now_add=True)
    edited_day = models.DateTimeField(auto_now=True)
    proteins = models.FloatField(default=0)
    fats = models.FloatField(default=0)
    carbohydrates = models.FloatField(default=0)

    class Meta:
        unique_together = ('title', 'calories')

    def __str__(self):
        return '{title}-{calories}'.format(title=self.title, calories=self.calories)


class UserPortion(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    weight = models.FloatField(default=0)
    user = models.ForeignKey(User, blank=False,  on_delete=models.CASCADE, default=1)
    added_day = models.DateTimeField(auto_now_add=True)
    # date should be auto_now_add=True, but possibly user want to add portion for another day:
    date = models.DateTimeField(default=timezone.now)
    eating = models.IntegerField(choices=FOOD_TYPE_TIME, default=default_eating)

    def __str__(self):
        weight = '{weight} gr'.format(weight=self.weight)
        day = self.date.strftime('%Y-%m-%d')
        eating = FOOD_TYPE_TIME[self.eating-1][1]
        return '{product}-{weight}-{user}-{day}-{eating}'.format(
            product=self.product.title,
            weight=weight,
            user=self.user.username,
            day=day,
            eating=eating
        )

    def user_portion_calories(self):
        total_calories = (self.weight / 100) * self.product.calories
        return '{total_calories:.2f}'.format(
            total_calories=total_calories
        )

    def portion_nutrients(self):
        total_proteins = (self.weight/100) * self.product.proteins
        total_fats = (self.weight/100) * self.product.fats
        total_carbohydrates = (self.weight/100) * self.product.carbohydrates
        return 'Proteins: {total_proteins:.2f};\nFats: {total_fats:.2f}; \nCarbohydrates: {total_carbohydrates:.2f}'.format(
            total_proteins=total_proteins,
            total_fats=total_fats,
            total_carbohydrates=total_carbohydrates,
        )


class DayCalories(models.Model):
    user_portion = models.ManyToManyField(UserPortion)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    day = models.DateField()
    added_day = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Day Calories'
        unique_together = ('user', 'day')

    def __str__(self):
        return '{user}-{day}'.format(day=self.day, user=self.user.username)

    def sum_calories(self):
        all_portions = self.user_portion.all()
        total_calories = 0
        for item in all_portions:
            total_calories = total_calories + (item.weight/100) * item.product.calories
        return '{total_calories:.2f}'.format(
            total_calories=total_calories
        )

    def total_nutrients(self):
        all_portions = self.user_portion.all()
        total_proteins = 0
        total_fats = 0
        total_carbohydrates = 0
        total_weight = 0
        for item in all_portions:
            total_proteins = total_proteins + (item.weight/100) * item.product.proteins
            total_fats = total_fats + (item.weight/100) * item.product.fats
            total_carbohydrates = total_carbohydrates + (item.weight/100) * item.product.carbohydrates
            total_weight = total_weight + item.weight
        return 'Proteins: {total_proteins:.2f};\nFats: {total_fats:.2f}; \nCarbohydrates: {total_carbohydrates:.2f}; \nWeight: {total_weight:.2f};'.format(
            total_proteins=total_proteins,
            total_fats=total_fats,
            total_carbohydrates=total_carbohydrates,
            total_weight=total_weight,
        )


class UserWeight(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    weight = models.FloatField(default=0)
    added_day = models.DateTimeField(auto_now_add=True)
    date = models.DateTimeField()

    def __str__(self):
        return '{title}'.format(title=self.user.name)


@receiver(post_save, sender=UserPortion)# the sender is your fix
def auto_create_or_update_day_calories(sender, instance, **kwargs):
    created = kwargs.get('created')
    if created:
        user = instance.user
        day = instance.date
        day_calorie = DayCalories.objects.filter(
            user=user,
            day=day
        )
        if not day_calorie.exists():
            day_calorie = DayCalories.objects.create(
                user=user,
                day=day
            )
            day_calorie.user_portion.add(instance)
        else:
            day_calorie.first().user_portion.add(instance)
