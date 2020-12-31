---
title: Loaders
---

# Loaders

From linking Sass files to saving hashed assets, here is a list of loaders you can use in your Eleventy project. If there isn't a loader that does what you're looking for, you can easily [write your own loader](/api/) and then [add your loader to this list](https://github.com/gregives/eleventy-load-website/tree/master/src/_data/loaders).

<table>
    <thead>
        <tr>
            <th>Loader</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {% for loader in loaders %}
        <tr>
            <td>
                <a href="{{ loader[1].link }}">{{ loader[0] }}</a>
            </td>
            <td>
                {{ loader[1].description }}
            </td>
        </tr>
        {% endfor %}
    </tbody>
</table>
