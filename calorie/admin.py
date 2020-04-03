from datetime import date
from django.contrib import admin
from .models import Product, DayCalories, UserPortion

# Register your models here.


class DayCaloriesInline(admin.TabularInline):
    model = DayCalories.user_portion.through
    extra = 2


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [ 'title', 'calories', 'id']
    readonly_fields = ('added_day', 'edited_day')
    search_fields = ['title']


@admin.register(UserPortion)
class UserPortionAdmin(admin.ModelAdmin):
    list_display = ['product', 'id', 'weight', 'user', 'eating', 'date']
    readonly_fields = ('added_day', )
    list_filter = ['added_day', 'eating', 'user']
    search_fields = ['product__title']
    autocomplete_fields = ('product', )


@admin.register(DayCalories)
class DayCaloriesAdmin(admin.ModelAdmin):
    list_display = ['day', 'user', 'sum_calories', 'total_nutrients']
    readonly_fields = ('added_day', 'sum_calories', 'total_nutrients')
    filter_horizontal = ('user_portion', )
    list_filter = ['day', ]
    # inlines = (DayCaloriesInline,)
    # exclude = ('user_portion',)
    # raw_id_fields = ('user_portion', )

    def sum_calories(self, obj):
        return obj.sum_calories()

    def total_nutrients(self, obj):
        return obj.total_nutrients()

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "user_portion":
            # show only todays user_portion
            today = date.today()
            kwargs["queryset"] = UserPortion.objects.filter(
                date__year=str(today.year),
                date__month=str(today.month),
                date__day=str(today.day)
            )
        return super(DayCaloriesAdmin, self).formfield_for_manytomany(db_field, request, **kwargs)
