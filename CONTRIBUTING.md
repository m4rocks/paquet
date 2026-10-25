# Contributing Guidelines

First of all, thanks for considering to contribute to
Paquet! 🥳

Keep in mind that those are guidelines and not strict
rules that everyone should follow, that's why
this document is going to be very brief. You could go on
and contribute to Paquet without reading a word of this
document, but it's good to at least have a clue of how
things are working here.

## Setup

Paquet uses [bun](https://bun.sh). After cloning:

```sh
bun install
bun dev
```

Before opening a pull request, make sure these pass:

```sh
bunx astro check
bun run build
```

To get GitHub release info working locally, put a `GITHUB_API_KEY` in a
`.dev.vars` file at the root of the repository.

## Adding an app

Apps are JSON files in the `apps/` folder, checked against
`app-spec-schema.json`. The
[getting started guide](https://paquet.m4.rocks/docs/getting-started) explains
how to write one. If you change `src/lib/app-schema.ts`, regenerate the schema
with `bun run generate:schema`.

## Branches

The `main` branch is reserved for production only. This
is the branch that gets deployed to production.

The `next` branch is used for the next major version.
This branch can also be used for the next minor version
in case there are no plans yet for a major version release.

## Issues

It is preferred to use the issue templates but it's not mandatory.
Those issue templates are made for you to have an easier time
creating the issue, not for me reading it.

## Pull requests

Pull requests should be made against:

- `main` in case of hotfix, doc change, config change
- `next` in case of improvement, bug fixes or anything else (so they are included in the next release)

Pull requests should be reviewed by **at least one person** so they can be
merged.