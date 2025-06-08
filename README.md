# ChocoPap

Welcome to ChocoPap website.

## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Built With](#built-with)
5. [Contributing](#contributing)
6. [Authors](#authors)
7. [License](#license)

## Description

The Chocopap online store is designed for chocolate lovers seeking high-quality gourmet creations. Its goal is to allow users to explore and purchase a wide selection of artisanal chocolates, ranging from timeless classics to innovative recipes.

## Installation

To install and run this project locally with Visual Studio Code, follow these steps:

1. Prepare the Environment

Install Scoop

```bash
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
iwr -useb get.scoop.sh | iex
```

Install Symfony CLI

```bash
scoop install symfony-cli
```

Add Symfony CLI to PATH :

```bash
export PATH="$HOME/.symfony/bin:$PATH"
```

Download and install Node.js from nodejs.org. Then install Yarn :

```bash
npm install --global yarn
```

2. Create a Symfony project :

Create a new Symfony project :

```bash
symfony new --webapp my_project
```

OR

```bash
composer create-project symfony/skeleton my_project
cd my_project
composer require webapp
```

Open the project in VS Code :

```bash
cd my_project
code .
```

3. Configure Webpack Encore and Vue.js :

Install Webpack Encore:

```bash
composer require symfony/webpack-encore-bundle
yarn add @symfony/webpack-encore --dev
```

Install Vue.js:

```bash
yarn add vue@next vue-loader@next vue-template-compiler
```

Configure Webpack Encore for Vue.js

Open webpack.config.js and add :

```bash
javascript
// enable Vue JS
.enableVueLoader()
```

Create the app.js file :

Inside the assets directory, create a file named app.js :

```bash
javascript
import "./styles/app.css";
import { createApp } from "vue";
import App from "./App.vue";
createApp(App).mount("#app");
```

Create a vue component:

Inside the assets directory, create a file named App.vue :

```bash
vue
<template>

  <div id="app">
    <h1>Hello Vue</h1>
    <p>Test Test</p>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
```

4. Install Vue Router

```bash
yarn add vue-router@next
```

5. Create a Symfony Controller

Create a controller :

```bash
php bin/console make:controller AppController
```

Modify the controller :

Open src/Controller/AppController.php and modify the index method :

```bash
php

<?php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/', name: 'app_app')]
    public function index(): Response
    {
        return $this->render('index.html.twig');
    }
}
```

Create the Twig template :

Inside the templates/ directory, create index.html.twig :

```bash
html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>{% block title %}Welcome!{% endblock %}</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22><text y=%221.2em%22 font-size=%2296%22></text></svg>">
        {% block stylesheets %}
            {{ encore_entry_link_tags('app') }}
        {% endblock %}
        {% block javascripts %}
            {{ encore_entry_script_tags('app') }}
        {% endblock %}
    </head>
    <body>
        {% block body %}
        <div id="app"></div>
        {% endblock %}
    </body>
</html>
```

6. Install Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/postcss postcss postcss-loader
```

7. Configure Webpack Encore for Tailwind CSS

In webpack.config.js, add :

```bash
javascript
// enable Tailwind CSS
.enablePostCssLoader()
```

8. Configure postcss.config.mjs

Create the postcss.config.mjs file and add :

```bash
javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

9. Add Tailwind CSS Directives to app.css

In assets/styles/, add the directives to app.css :

```bash
css
@import "tailwindcss";
```

10. Add the Viewport Meta Tag to index.html.twig

In templates/, add the viewport meta tag inside the <head> of index.html.twig :

```bash
html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  {% block stylesheets %}
    {{ encore_entry_link_tags('app') }}
  {% endblock %}
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

11. Run the Local Serve

Compile assets :

```bash
yarn encore dev --watch
```

Start Symfony server :

```bash
symfony server:start
```

## Usage

Access the application via http://localhost:8000/

## Built With

- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS (front-end)
- [Vue JS](https://vuejs.org/) - Framework front-end
- [Symfony](https://symfony.com/) - Framework back-end
- [Visual Studio Code](https://code.visualstudio.com/) - IDE

## Contributing

Contributions make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Authors

[@Flogau44](https://github.com/Flogau44)

## License

This project is licensed under the MIT License. See LICENSE for more details.
