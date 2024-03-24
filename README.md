# Finite Craft

## Todos:

Frontend:
- [ ] Modify UI with arrows to show the merging of words
- [ ] Add a drawer/sheet to show the words that can be merged
- [ ] Add loading animation while generating
- [ ] Add goal word node as the final step of the graph underneath
- [ ] Drag and drop from limited set of words in drawer
- [ ] Responsive layout (zoom)

Backend:
- [x] Write API endpoint for merging words
- [x] Add a `README.md` file.
- [x] Write script to generate candidate words of the day and primitives to start from either using our API or from the data from InfiniteCraftWiki
  - [x] Parsing the data from the infinitecraftwiki ended up being extremely complicated
  - [x] Handwrote the recipes for now
- [x] Add an API endpoint to get word of the day, and word options
- [ ] Modify API to include emoji with word

Ideas:
- [ ] Add embedding comparison between two words, to see how close you are to the goal word


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.