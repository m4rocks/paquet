---
title: Getting started
---

# Getting started

:wave: Hi! Here is how you can add your app to Paquet. Adding
a new app is done by adding a spec to `apps` folder in the
[GitHub repo](https://github.com/m4rocks/paquet).

> Verification on apps has been removed, because all apps are checked
> during the listing process.

### Requirements:
* Web app manifest
* Service worker
* Name
* App icons

> Since 3.2.0, requirements are a little bit stricter.

## Preparing your `manifest.json`

You can use your `manifest.json` or `site.webmanifest` to specify the app listing
details.

Here are the keys we use when displaying your app listing on Paquet:

* `name`
* `author`
* `description`
* `categories`
* `icons`
* `screenshots`
* `theme_color`

You can find more about manifest keys on the [manifest documentation](/docs/manifest)

## Preparing your `index.html` (home page)

We also fetch some properties from the index page. Those are:
* `og:image` (for the cover)
* `author`
* `description`

The `og:image` should be a cover image. Preferably 1024x600.

## Extra

When you submit your app, you need specify your app's features. These features include:
mobile optimisation, offline capability and more.

You can also specify an URL to your app's source code.

> In future releases, you will have the ability to display releases from GitHub or GitLab.

## Issues

In case your app has some issues, it will be temporarily taken down until the issues have been resolved.
