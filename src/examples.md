# Examples

{% for example in collections.example %}
[{{ example.data.title }}]({{ example.url }})
{% endfor %}
