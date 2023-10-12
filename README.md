# tools-fe

<div align="center">

[![GitHub Release Date - Published_At](https://img.shields.io/github/release-date/nextstarproject/tools-fe?display_date=published_at&logo=github&label=RELEASE%20DATE&color=blank&cacheSeconds=86400)](https://github.com/nextstarproject/tools-fe/releases) [![REALEASE](https://github.com/nextstarproject/tools-fe/actions/workflows/realease_ci.yml/badge.svg?branch=master)](https://github.com/nextstarproject/tools-fe/actions/workflows/realease_ci.yml) [![GitHub release (with filter)](https://img.shields.io/github/v/release/nextstarproject/tools-fe?logo=github&label=RELEASE%20VERSION&color=blank&cacheSeconds=86400)](https://github.com/nextstarproject/tools-fe/releases/latest) [![PUSH CHECK CI](https://github.com/nextstarproject/tools-fe/actions/workflows/push_check_ci.yml/badge.svg?branch=master)](https://github.com/nextstarproject/tools-fe/actions/workflows/push_check_ci.yml)

</div>

---

This is a pure front-end project with no back-end request processing; an online front-end tool site.

## Technology stack

- [Ant Design](https://ant.design/)
- [Vite](https://vitejs.dev/)
- [pnpm](https://pnpm.io/)

## Join Development

Participation in its development process.

### Folder structure

Folder structure.

- apps: holds all project levels
- configs: holds common configurations, which can be introduced directly into the project
- packages: Common project toolkit
- components: common UI libraries, etc.

### Start the project

Go to the project folder `apps/**` and use `cmd` to run the `pnpm run dev` command to start the specified project.

### Upgrade dependencies

```shell
pnpm up --filter "./apps/**"
```

to upgrade all packages under `apps`

### Lint all project

```shell
pnpm --filter "./apps/**" --filter "./packages/**" lint:error
```

### tsc all project

```shell
pnpm --filter "./apps/**" --filter "./packages/**" tsc
```

### Build all project

```shell
pnpm --filter "./apps/**" --filter "./packages/**" build
```

### Skip pre-commit

```shell
git commit -n -m "some message"
```

### Uninstall husky

```shell
npm uninstall husky && git config --unset core.hooksPath
```
