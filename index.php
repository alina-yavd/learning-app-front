<?php

use Symfony\Component\Asset\Package;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use Symfony\Component\Asset\VersionStrategy\EmptyVersionStrategy;
use Twig\TwigFunction;

define('DS', DIRECTORY_SEPARATOR);
define('BASE_PATH', __DIR__ . DS);

require_once __DIR__ . '/vendor/autoload.php';

/*
 * Twig Setup
 */

$loader = new FilesystemLoader('./src/templates');
$twig = new Environment($loader);
//$twig = new Environment($loader, [
//    'cache' => './src/cache',
//]);

$function_asset = new TwigFunction('asset', function ($url) {
    $package = new Package(new EmptyVersionStrategy());
    echo $package->getUrl('/src/assets/' . $url);
});
$twig->addFunction($function_asset);

$function_url = new TwigFunction('url', function ($url) {
    $package = new Package(new EmptyVersionStrategy());
    echo $package->getUrl('/src/assets/' . $url);
});
$twig->addFunction($function_url);


/*
 * Routing Setup
 */

$app = System\App::instance();
$app->request = System\Request::instance();
$app->route = System\Route::instance($app->request);

$app->route->get('', function () use ($twig) {
    $template = $twig->load('index.html.twig');
    echo $template->render(['path' => app('request')->path]);
});

$app->route->get('/words', function () use ($twig) {
    $template = $twig->load('words.html.twig');
    echo $template->render(['path' => app('request')->path]);
});

$app->route->get('/group/{id}', function (int $id) use ($twig) {
    $template = $twig->load('group.html.twig');
    echo $template->render(['path' => app('request')->path, 'id' => $id]);
});

$app->route->get('/upload', function () use ($twig) {
    $template = $twig->load('upload.html.twig');
    echo $template->render(['path' => app('request')->path]);
});

$app->route->end();
