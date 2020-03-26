from django.contrib import admin
from .models import Product, DayCalories, UserPortion

# Register your models here.


class DayCaloriesInline(admin.TabularInline):
    model = DayCalories.user_portion.through
    extra = 2


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'calories']
    readonly_fields = ('added_day', 'edited_day')
    search_fields = ['title']


@admin.register(UserPortion)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['product', 'id', 'weight', 'user', 'eating', 'date']
    readonly_fields = ('added_day', )
    list_filter = ['added_day', 'eating']


@admin.register(DayCalories)
class DayCaloriesAdmin(admin.ModelAdmin):
    list_display = ['day', 'user', 'id', 'sum_calories', 'total_nutrients']
    readonly_fields = ('added_day', 'sum_calories', 'total_nutrients')
    filter_horizontal = ('user_portion', )
    # inlines = (DayCaloriesInline,)
    # exclude = ('user_portion',)
    # raw_id_fields = ('user_portion', )

    def sum_calories(self, obj):
        return obj.sum_calories()

    def total_nutrients(self, obj):
        return obj.total_nutrients()