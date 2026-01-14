const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env") });

const mongoose = require("mongoose");
const User = require("./models/User");
const Subject = require("./models/Subject");
const Topic = require("./models/Topic");
const Theory = require("./models/Theory");
const connectDB = require("./config/db");

const seedData = async () => {
  try {
    await connectDB();

    // 1. Seed Admin
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@example.com",
        password: "123",
        isAdmin: true,
      });
      console.log("Admin user created successfully");
    }

    // 2. Seed Subjects
    const subjects = [
      {
        name: "React",
        title: "React Concepts",
        path: "/react",
        icon: "Zap",
        color: "text-blue-500",
        order: 1,
      },
      {
        name: "JavaScript",
        title: "JavaScript Core",
        path: "/js",
        icon: "Code",
        color: "text-yellow-500",
        order: 2,
      },
      {
        name: "HTML & CSS",
        title: "HTML & CSS",
        path: "/html-css",
        icon: "Layers",
        color: "text-orange-500",
        order: 3,
      },
      {
        name: "TypeScript",
        title: "TypeScript",
        path: "/ts",
        icon: "FileCode",
        color: "text-blue-600",
        order: 4,
      },
    ];

    for (const sub of subjects) {
      const exists = await Subject.findOne({ path: sub.path });
      if (!exists) {
        await Subject.create(sub);
        console.log(`Subject ${sub.name} created`);
      }
    }

    // 3. Seed Topics (Categories like Hooks, Patterns)
    const topics = [
      {
        topicId: "hooks",
        name: "React Hooks",
        subject: "react",
        icon: "Zap",
        color: "from-blue-500 to-cyan-500",
        order: 1,
      },
      {
        topicId: "advanced-hooks",
        name: "Advanced Hooks",
        subject: "react",
        icon: "Zap",
        color: "from-purple-500 to-pink-500",
        order: 2,
      },
      {
        topicId: "patterns",
        name: "Performance & Patterns",
        subject: "react",
        icon: "Activity",
        color: "from-green-500 to-emerald-500",
        order: 3,
      },
    ];

    for (const topic of topics) {
      const exists = await Topic.findOne({ topicId: topic.topicId });
      if (!exists) {
        await Topic.create(topic);
        console.log(`Topic ${topic.name} created`);
      } else {
        // Optional: Update if exists to ensure latest schema/colors
        Object.assign(exists, topic);
        await exists.save();
        console.log(`Topic ${topic.name} updated`);
      }
    }

    // 4. Seed Theories (The actual content)
    const theories = [
      // Optimization / Patterns
      {
        topicId: "context-optimization",
        title: "Context Optimization",
        subject: "react",
        section: "patterns", // Links to topicId 'patterns'
        level: "intermediate",
        icon: "Users",
        order: 1,
        componentKey: "ContextOptimizationDemo",
        theory: {
          overview:
            "Optimizing Context performance to prevent unnecessary re-renders. A naïve Context implementation can cause the entire app to re-render whenever a single value changes.",
          definition:
            "Context Optimization refers to patterns (like splitting context or memoizing values) that reduce the number of components re-rendering when context updates.",
          syntax: `const ValueContext = createContext();\nconst DispatchContext = createContext();\n\n// App\n<ValueContext.Provider value={state}>\n  <DispatchContext.Provider value={dispatch}>\n    {children}\n  </DispatchContext.Provider>\n</ValueContext.Provider>`,
          realLifeScenario:
            "A global 'Settings' context. If you put 'Theme' (changes rarely) and 'MousePosition' (changes constantly) in the same Context, every time the mouse moves, the whole app re-renders (because Theme consumers also update). Splitting them into `ThemeContext` and `MousePosContext` fixes this.",
          pros: [
            "Drastically reduces re-renders.",
            "Keeps app performant even with global state.",
          ],
          cons: [
            "Increases boilerplate (more Providers).",
            "Complexity in setup.",
          ],
          whenToUse: [
            "High-frequency updates in Context",
            "Large component trees consuming context",
            "Separating static data/dispatchers from mutable data",
          ],
          tips: [
            "Split state and dispatch into separate contexts",
            "Use useMemo for the value passed to Provider",
          ],
          deepDive:
            "If the value passed to `Provider` is a new object every time `{ a: 1 }`, all consumers re-render. Memoizing it `useMemo(() => ({ a: 1 }), [])` prevents this only if the parent re-renders. Splitting Context is the ultimate fix.",
          commonPitfalls: [
            "Passing a new object literal directly to `value` prop",
            "Putting everything in one giant GlobalContext",
          ],
        },
      },
      {
        topicId: "lazy-loading",
        title: "Lazy Loading",
        subject: "react",
        section: "patterns",
        level: "intermediate",
        icon: "Package",
        order: 2,
        componentKey: "LazyLoadDemo",
        theory: {
          overview:
            "A design pattern that defers the loading of non-critical resources (like images or code components) until they are actually needed. In React, this usually means `React.lazy` and `Suspense`.",
          definition:
            "Lazy loading is the practice of delaying load or initialization of resources or objects until the point at which they are needed to improve performance and save system resources.",
          syntax: `const Profile = lazy(() => import('./Profile'));\n\n// Usage\n<Suspense fallback={<Spinner />}>\n  <Profile />\n</Suspense>`,
          realLifeScenario:
            "A dashboard with a heavy 'Admin Panel' that only 1% of users see. Instead of shipping that code to everyone, you 'lazy load' it. The byte size of the initial bundle drops, making the site load faster for the 99% who never visit Admin.",
          pros: [
            "Faster initial load time (smaller bundle).",
            "Saves bandwidth for users.",
          ],
          cons: [
            "User waits when navigating to the lazy part (needs spinner).",
            "Complexity with layout shifts or loading states.",
          ],
          whenToUse: [
            "Route-based code splitting (Pages)",
            "Heavy components (Charts, Maps, Editors) not immediately visible",
            "Modals/Dialogs that open on interaction",
          ],
          tips: [
            "Wrap routes in Suspense",
            "Use meaningful loading skeletons instead of blank screens",
          ],
          deepDive:
            "Webpack/Vite sees the dynamic `import()` and creates a separate 'chunk' file. React `Suspense` manages the UI state (showing fallback) while that network request fetches the chunk.",
          commonPitfalls: [
            "Lazy loading everything (too many network requests)",
            "Lazy loading above the fold content (causes layout shift/LCP issues)",
          ],
        },
      },
      {
        topicId: "virtualization",
        title: "Virtualization",
        subject: "react",
        section: "patterns",
        level: "expert",
        icon: "Layers",
        order: 3,
        componentKey: "VirtualizationDemo",
        theory: {
          overview:
            "A technique to render huge lists of data efficiently. Instead of creating DOM nodes for all 10,000 items, you only create the 10 items currently visible on screen. As you scroll, you recycle them.",
          definition:
            "Virtualization (or Windowing) is a technique that only renders a small subset of rows at any given time.",
          syntax: `// Using react-window\n<FixedSizeList\n  height={150}\n  itemCount={1000}\n  itemSize={35}\n  width={300}\n>\n  {Row}\n</FixedSizeList>`,
          realLifeScenario:
            "Social Media Feed (Twitter/Facebook). You can scroll forever. If they kept all previous posts in the DOM, your browser would crash after 10 minutes. They 'virtualize' the list, keeping only the visible tweets in memory/DOM.",
          pros: [
            "Constant memory usage regardless of list size.",
            "Silky smooth scrolling performance (60fps).",
            "Near-instant initial render.",
          ],
          cons: [
            "Ctrl+F (Browser Find) doesn't find off-screen items.",
            "Complexity with dynamic item heights.",
            "Accessibility can be tricky.",
          ],
          whenToUse: [
            "Lists with 100+ complex items or 1000+ simple items",
            "Infinite scroll feeds",
            "Tables with massive datasets",
          ],
          tips: [
            "Use libraries like `react-window` or `react-virtuality`",
            "Handle dynamic heights carefully (performance hit)",
          ],
          deepDive:
            "It calculates which items are visible based on scroll position and container height. It creates absolute-positioned divs for those items. It adds a big empty div to simulate the total scroll height.",
          commonPitfalls: [
            "Implementing it for small lists (premature optimization)",
            "Breaking accessibility (screen readers need to know total count)",
          ],
        },
      },
      {
        topicId: "debounce",
        title: "Debouncing",
        subject: "react",
        section: "patterns",
        level: "intermediate",
        icon: "Clock",
        order: 4,
        componentKey: "DebounceDemo",
        theory: {
          overview:
            "A technique to limit the rate at which a function fires. It ensures a time-consuming task (like an API call) only runs after the user has *stopped* doing an action (like typing) for a certain delay.",
          definition:
            "Debouncing forces a function to wait a certain amount of time before running. If the function is called again during that time, the timer resets.",
          syntax: `const debouncedSearch = debounce((query) => {\n  api.search(query);\n}, 500);\n\n// Usage\n<input onChange={(e) => debouncedSearch(e.target.value)} />`,
          realLifeScenario:
            "Search Autocomplete. Without debounce, searching for 'React' fires 5 API calls ('R', 'Re', 'Rea'...). With debounce (500ms), it waits until you stop typing and fires only 1 call for 'React'.",
          pros: [
            "Reduces server load (fewer API calls).",
            "Improves client performance (fewer renders).",
          ],
          cons: [
            "User sees results with a slight delay.",
            "Complexity in handling 'cleanup' (canceling pending timers).",
          ],
          whenToUse: [
            "Search inputs / Autocomplete",
            "Window resize/scroll event handlers",
            "Auto-saving forms",
          ],
          tips: [
            "Use cleanup to cancel timers on unmount",
            "Use Lodash.debounce or custom hook for simplicity",
          ],
          deepDive:
            "Debounce is different from Throttle. Throttle ensures function runs at most once every X ms (steady flow). Debounce waits for a pause in the pauses.",
          commonPitfalls: [
            "Creating the debounced function inside the render loop (it gets recreated, timer lost)",
            "Forgetting to persist the function with useCallback or useRef",
          ],
        },
      },
    ];

    for (const theory of theories) {
      const exists = await Theory.findOne({ topicId: theory.topicId });
      if (!exists) {
        await Theory.create(theory);
        console.log(`Theory ${theory.title} created`);
      } else {
        Object.assign(exists, theory);
        await exists.save();
        console.log(`Theory ${theory.title} updated`);
      }
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
