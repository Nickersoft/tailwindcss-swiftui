# A TailwindCSS Generator for SwiftUI :art:

> **IMPORTANT**: This repo is highly experimental and extremely incomplete!! Most likely it will not fill all your needs right now, but I'm working on it.

## What am I looking at?

This is an early attempt at building a CLI tool (written in Node, though I wish it could be Swift\*) to generate Tailwind SwiftUI styles from a `tailwind.config.js` file.

Imagine writing this for your web app:

```js
export default {
  // ...rest of tailwind.config.js...
  theme: {
    colors: {
      blue: {
        light: "#94B3FF",
        dark: "#649FFF",
      },
    },
  },
};
```

and using it in your SwiftUI app as:

```swift
Text(verbatim: "Wow this is great!")
  .background(Tailwind.Colors.Blue.light)
```

> \* This repo is written in TypeScript in order to utilize the `resolveConfig()` and `eval()` abilities of Tailwind/JavaScript. I'd love to have this be completely Swift-centric, but it would involve re-implementing a lot of parsing and evaluation logic in Swift.

## Why would you need this?

While TailwindCSS is _extraordinarily_ popular in the frontend community right now for its simplified approach to writing CSS stylings, it also holds incredible potential in building and maintaining comprehensive design systems across a variety of non-web mediums (desktop, mobile, tablet, etc.).

With the introduction of SwiftUI and macOS Catalyst in 2019, Apple made it _incredibly_ easy for both programmers and designers alike to build user interfaces for all Apple platforms using a single codebase. It only makes sense that a tool should exist to bring the design systems defined by Tailwind configs into the world of SwiftUI.

## Couldn't I just use React Native / Ionic?

You could, but given how easy SwiftUI is to pick up, there's really no excuse to not go native :)

## Supported Property Checklist

- [x] boxShadow
- [ ] fontFamily
- [x] colors
- [ ] screens
- [ ] columns
- [ ] spacing
- [ ] animation
- [ ] aspectRatio
- [ ] backdropBlur
- [ ] backdropBrightness
- [ ] backdropContrast
- [ ] backdropGrayscale
- [ ] backdropHueRotate
- [ ] backdropInvert
- [ ] backdropOpacity
- [ ] backdropSaturate
- [ ] backdropSepia
- [ ] backgroundColor
- [ ] backgroundImage
- [ ] backgroundOpacity
- [ ] backgroundPosition
- [ ] backgroundSize
- [ ] blur
- [ ] brightness
- [ ] borderColor
- [ ] borderOpacity
- [ ] borderRadius
- [ ] borderWidth
- [ ] boxShadowColor
- [ ] caretColor
- [ ] accentColor
- [ ] contrast
- [ ] container
- [ ] content
- [ ] cursor
- [ ] divideColor
- [ ] divideOpacity
- [ ] divideWidth
- [x] dropShadow
- [ ] fill
- [ ] grayscale
- [ ] hueRotate
- [ ] invert
- [ ] flex
- [ ] flexBasis
- [ ] flexGrow
- [ ] flexShrink
- [ ] fontSize
- [ ] fontWeight
- [ ] gap
- [ ] gradientColorStops
- [ ] gridAutoColumns
- [ ] gridAutoRows
- [ ] gridColumn
- [ ] gridColumnEnd
- [ ] gridColumnStart
- [ ] gridRow
- [ ] gridRowStart
- [ ] gridRowEnd
- [ ] gridTemplateColumns
- [ ] gridTemplateRows
- [ ] height
- [ ] inset
- [ ] keyframes
- [ ] letterSpacing
- [ ] lineHeight
- [ ] listStyleType
- [ ] margin
- [ ] maxHeight
- [ ] maxWidth
- [ ] minHeight
- [ ] minWidth
- [ ] objectPosition
- [ ] opacity
- [ ] order
- [ ] padding
- [ ] placeholderColor
- [ ] placeholderOpacity
- [ ] outlineColor
- [ ] outlineOffset
- [ ] outlineWidth
- [ ] ringColor
- [ ] ringOffsetColor
- [ ] ringOffsetWidth
- [ ] ringOpacity
- [ ] ringWidth
- [ ] rotate
- [ ] saturate
- [ ] scale
- [ ] scrollMargin
- [ ] scrollPadding
- [ ] sepia
- [ ] skew
- [ ] space
- [ ] stroke
- [ ] strokeWidth
- [ ] textColor
- [ ] textDecorationColor
- [ ] textDecorationThickness
- [ ] textUnderlineOffset
- [ ] textIndent
- [ ] textOpacity
- [ ] transformOrigin
- [ ] transitionDelay
- [ ] transitionDuration
- [ ] transitionProperty
- [ ] transitionTimingFunction
- [ ] translate
- [ ] width
- [ ] willChange
- [ ] zIndex
