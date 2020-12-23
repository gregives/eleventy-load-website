# Examples

{% for example in collections.example %}
- [{{ example.data.description }}]({{ example.url }})
{% endfor %}