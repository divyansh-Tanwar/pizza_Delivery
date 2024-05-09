// webpack.mix.js

let mix = require('laravel-mix');

// this is used to compile resources forlder file and store them into the public folder
mix.js('resources/js/app.js', 'public/js/app.js');
mix.sass('resources/scss/app.scss','public/css/app.css');