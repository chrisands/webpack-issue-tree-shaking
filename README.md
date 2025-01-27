# webpack tree shaking issue

This describes a problem where webpack do not tree shake factories where function returned from the factory is enriched with additional methods (more then one).

Consider the following code:

```javascript
export function createRoute(options) {
  const route = () => {};
  route.one = "423";
  route.two = "123";

  return route;
}
```

If we comment one of methods, webpack will tree shake them. However, it's worth noting that webpack does not add any `/*#__PURE__*/` [comments](https://terser.org/docs/miscellaneous/#annotations) either way. You can test this by disabling `optimization.minimize = false`. The guess is that terser also evaluates code and checks for unreachable code too.

For comparison, there is vite config and if we run `pnpm vite build` is won't have same issue.

# Reproduce

To reproduce the issue, follow these steps:

1. Install deps:

```sh
$ pnpm i
```

2. Start by building existing code:

```sh
pnpm webpack
```

3. Check `dist/main.js`. It will be like this:

<!-- prettier-ignore-start -->
```javascript
(()=>{"use strict";!function(){const t=()=>{};t.one="423",t.two="123"}()})();
```
<!-- prettier-ignore-end -->

4. Then try to comment any of methods in `src/factory.js` and rebuild.

5. Check `dist/main.js` again. It will be empty.
