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
    list_display = ['day', 'user', 'id', 'day_summary']
    readonly_fields = ('added_day', 'day_summary')
    filter_horizontal = ('user_portion', )
    # inlines = (DayCaloriesInline,)
    # exclude = ('user_portion',)
    # raw_id_fields = ('user_portion', )

    def day_summary(self, obj):
        return obj.day_summary()
