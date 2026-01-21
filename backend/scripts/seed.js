const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const User = require("../models/User");
const Subject = require("../models/Subject");
const Topic = require("../models/Topic");
const Theory = require("../models/Theory");
const connectDB = require("../config/db");

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
      {
        topicId: "js-fundamentals",
        name: "Fundamentals",
        subject: "js",
        icon: "Box",
        color: "from-yellow-400 to-orange-500",
        order: 1,
      },
      {
        topicId: "js-functions",
        name: "Functions & Scope",
        subject: "js",
        icon: "Code",
        color: "from-blue-400 to-indigo-500",
        order: 2,
      },
      {
        topicId: "js-async",
        name: "Asynchronous JS",
        subject: "js",
        icon: "Activity",
        color: "from-green-400 to-emerald-500",
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
        richContent: `<h2>Overview</h2><p>Optimizing Context performance to prevent unnecessary re-renders. A naïve Context implementation can cause the entire app to re-render whenever a single value changes.</p><h2>Definition</h2><p>Context Optimization refers to patterns (like splitting context or memoizing values) that reduce the number of components re-rendering when context updates.</p><h2>Syntax</h2><pre><code class="language-javascript">const ValueContext = createContext();\nconst DispatchContext = createContext();\n\n// App\n<ValueContext.Provider value={state}>\n  <DispatchContext.Provider value={dispatch}>\n    {children}\n  </DispatchContext.Provider>\n</ValueContext.Provider></code></pre><h2>Real Life Scenario</h2><p>A global 'Settings' context. If you put 'Theme' (changes rarely) and 'MousePosition' (changes constantly) in the same Context, every time the mouse moves, the whole app re-renders (because Theme consumers also update). Splitting them into \`ThemeContext\` and \`MousePosContext\` fixes this.</p><h2>Deep Dive</h2><p>If the value passed to \`Provider\` is a new object every time \`{ a: 1 }\`, all consumers re-render. Memoizing it \`useMemo(() => ({ a: 1 }), [])\` prevents this only if the parent re-renders. Splitting Context is the ultimate fix.</p><h2>Pros</h2><ul><li>Drastically reduces re-renders.</li><li>Keeps app performant even with global state.</li></ul><h2>Cons</h2><ul><li>Increases boilerplate (more Providers).</li><li>Complexity in setup.</li></ul><h2>When to Use</h2><ul><li>High-frequency updates in Context</li><li>Large component trees consuming context</li><li>Separating static data/dispatchers from mutable data</li></ul><h2>Tips</h2><ul><li>Split state and dispatch into separate contexts</li><li>Use useMemo for the value passed to Provider</li></ul><h2>Common Pitfalls</h2><ul><li>Passing a new object literal directly to \`value\` prop</li><li>Putting everything in one giant GlobalContext</li></ul>`,
        contentBlocks: [
          {
            type: "alert",
            alertType: "info",
            content:
              "This topic primarily uses richContent, but this alert proves contentBlocks support works alongside it!",
            order: 0,
          },
        ],
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
        richContent: `<h2>Overview</h2><p>A design pattern that defers the loading of non-critical resources (like images or code components) until they are actually needed. In React, this usually means \`React.lazy\` and \`Suspense\`.</p><h2>Definition</h2><p>Lazy loading is the practice of delaying load or initialization of resources or objects until the point at which they are needed to improve performance and save system resources.</p><h2>Syntax</h2><pre><code class="language-javascript">const Profile = lazy(() => import('./Profile'));\n\n// Usage\n<Suspense fallback={<Spinner />}>\n  <Profile />\n</Suspense></code></pre><h2>Real Life Scenario</h2><p>A dashboard with a heavy 'Admin Panel' that only 1% of users see. Instead of shipping that code to everyone, you 'lazy load' it. The byte size of the initial bundle drops, making the site load faster for the 99% who never visit Admin.</p><h2>Deep Dive</h2><p>Webpack/Vite sees the dynamic \`import()\` and creates a separate 'chunk' file. React \`Suspense\` manages the UI state (showing fallback) while that network request fetches the chunk.</p><h2>Pros</h2><ul><li>Faster initial load time (smaller bundle).</li><li>Saves bandwidth for users.</li></ul><h2>Cons</h2><ul><li>User waits when navigating to the lazy part (needs spinner).</li><li>Complexity with layout shifts or loading states.</li></ul><h2>When to Use</h2><ul><li>Route-based code splitting (Pages)</li><li>Heavy components (Charts, Maps, Editors) not immediately visible</li><li>Modals/Dialogs that open on interaction</li></ul><h2>Tips</h2><ul><li>Wrap routes in Suspense</li><li>Use meaningful loading skeletons instead of blank screens</li></ul><h2>Common Pitfalls</h2><ul><li>Lazy loading everything (too many network requests)</li><li>Lazy loading above the fold content (causes layout shift/LCP issues)</li></ul>`,
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
        richContent: `<h2>Overview</h2><p>A technique to render huge lists of data efficiently. Instead of creating DOM nodes for all 10,000 items, you only create the 10 items currently visible on screen. As you scroll, you recycle them.</p><h2>Definition</h2><p>Virtualization (or Windowing) is a technique that only renders a small subset of rows at any given time.</p><h2>Syntax</h2><pre><code class="language-javascript">// Using react-window\n<FixedSizeList\n  height={150}\n  itemCount={1000}\n  itemSize={35}\n  width={300}\n>\n  {Row}\n</FixedSizeList></code></pre><h2>Real Life Scenario</h2><p>Social Media Feed (Twitter/Facebook). You can scroll forever. If they kept all previous posts in the DOM, your browser would crash after 10 minutes. They 'virtualize' the list, keeping only the visible tweets in memory/DOM.</p><h2>Deep Dive</h2><p>It calculates which items are visible based on scroll position and container height. It creates absolute-positioned divs for those items. It adds a big empty div to simulate the total scroll height.</p><h2>Pros</h2><ul><li>Constant memory usage regardless of list size.</li><li>Silky smooth scrolling performance (60fps).</li><li>Near-instant initial render.</li></ul><h2>Cons</h2><ul><li>Ctrl+F (Browser Find) doesn't find off-screen items.</li><li>Complexity with dynamic item heights.</li><li>Accessibility can be tricky.</li></ul><h2>When to Use</h2><ul><li>Lists with 100+ complex items or 1000+ simple items</li><li>Infinite scroll feeds</li><li>Tables with massive datasets</li></ul><h2>Tips</h2><ul><li>Use libraries like \`react-window\` or \`react-virtuality\`</li><li>Handle dynamic heights carefully (performance hit)</li></ul><h2>Common Pitfalls</h2><ul><li>Implementing it for small lists (premature optimization)</li><li>Breaking accessibility (screen readers need to know total count)</li></ul>`,
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
        richContent: `<h2>Overview</h2><p>A technique to limit the rate at which a function fires. It ensures a time-consuming task (like an API call) only runs after the user has *stopped* doing an action (like typing) for a certain delay.</p><h2>Definition</h2><p>Debouncing forces a function to wait a certain amount of time before running. If the function is called again during that time, the timer resets.</p><h2>Syntax</h2><pre><code class="language-javascript">const debouncedSearch = debounce((query) => {\n  api.search(query);\n}, 500);\n\n// Usage\n<input onChange={(e) => debouncedSearch(e.target.value)} /></code></pre><h2>Real Life Scenario</h2><p>Search Autocomplete. Without debounce, searching for 'React' fires 5 API calls ('R', 'Re', 'Rea'...). With debounce (500ms), it waits until you stop typing and fires only 1 call for 'React'.</p><h2>Deep Dive</h2><p>Debounce is different from Throttle. Throttle ensures function runs at most once every X ms (steady flow). Debounce waits for a pause in the pauses.</p><h2>Pros</h2><ul><li>Reduces server load (fewer API calls).</li><li>Improves client performance (fewer renders).</li></ul><h2>Cons</h2><ul><li>User sees results with a slight delay.</li><li>Complexity in handling 'cleanup' (canceling pending timers).</li></ul><h2>When to Use</h2><ul><li>Search inputs / Autocomplete</li><li>Window resize/scroll event handlers</li><li>Auto-saving forms</li></ul><h2>Tips</h2><ul><li>Use cleanup to cancel timers on unmount</li><li>Use Lodash.debounce or custom hook for simplicity</li></ul><h2>Common Pitfalls</h2><ul><li>Creating the debounced function inside the render loop (it gets recreated, timer lost)</li><li>Forgetting to persist the function with useCallback or useRef</li></ul>`,
      },
      // JavaScript Theories
      {
        topicId: "js-hoisting",
        title: "Hoisting",
        subject: "js",
        section: "js-fundamentals",
        level: "beginner",
        icon: "ArrowUp",
        order: 1,
        componentKey: "HoistingDemo",
        richContent: `<h2>Overview</h2><p>Hoisting is JavaScript's default behavior of moving declarations to the top.</p><h2>Definition</h2><p>Hoisting is a mechanism where variables and function declarations are moved to the top of their containing scope before code execution.</p><h2>Syntax</h2><pre><code class="language-javascript">console.log(x); // undefined\\nvar x = 5;\\n\\nhello(); // 'Hello!'\\nfunction hello() { console.log('Hello!'); }</code></pre><h2>Real Life Scenario</h2><p>Understanding why you can call a function before you define it in your code file.</p><h2>Deep Dive</h2><p>Only declarations are hoisted, not initializations. \`let\` and \`const\` are hoisted but remain in the 'Temporal Dead Zone'.</p><h2>Pros</h2><ul><li>Allows declaring functions after usage for readability.</li></ul><h2>Cons</h2><ul><li>Can lead to confusion and bugs with \`var\`.</li></ul><h2>When to Use</h2><ul><li>Useful for organizing code (functions at bottom).</li></ul><h2>Tips</h2><ul><li>Avoid relying on variable hoisting. Use \`let\` and \`const\`.</li></ul><h2>Common Pitfalls</h2><ul><li>Assuming \`let\` variables are initialized to unnecessary values.</li></ul>`,
      },
      {
        topicId: "js-closures",
        title: "Closures",
        subject: "js",
        section: "js-functions",
        level: "intermediate",
        icon: "Lock",
        order: 1,
        componentKey: "ClosureDemo",
        richContent: `<h2>Overview</h2><p>A closure gives you access to an outer function's scope from an inner function.</p><h2>Definition</h2><p>A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).</p><h2>Syntax</h2><pre><code class="language-javascript">function makeCounter() {\\n  let count = 0;\\n  return function() {\\n    return count++;\\n  };\\n}\\nconst counter = makeCounter();\\ncounter(); // 0</code></pre><h2>Real Life Scenario</h2><p>Data privacy. Creating private variables that cannot be accessed directly from outside the function.</p><h2>Deep Dive</h2><p>Closures are created every time a function is created, at function creation time.</p><h2>Pros</h2><ul><li>Data encapsulation.</li><li>maintaining state in async operations.</li></ul><h2>Cons</h2><ul><li>Memory leaks if not handled correctly (references are kept alive).</li></ul><h2>When to Use</h2><ul><li>Module patterns</li><li>Memoization</li><li>Event handlers needing access to scope</li></ul><h2>Tips</h2><ul><li>Use closures to create private state.</li></ul><h2>Common Pitfalls</h2><ul><li>Looping with \`var\` and closures (shared scope issue).</li></ul>`,
      },
      {
        topicId: "js-event-loop",
        title: "Event Loop",
        subject: "js",
        section: "js-async",
        level: "expert",
        icon: "RefreshCw",
        order: 1,
        componentKey: "EventLoopDemo",
        richContent: `<h2>Overview</h2><p>The secret behind JavaScript's non-blocking I/O.</p><h2>Definition</h2><p>The Event Loop is a mechanism that allows JavaScript to perform non-blocking operations by offloading operations to the system kernel whenever possible.</p><h2>Syntax</h2><pre><code class="language-javascript">console.log('Start');\\nsetTimeout(() => console.log('Timeout'), 0);\\nPromise.resolve().then(() => console.log('Promise'));\\nconsole.log('End');\\n// Output: Start, End, Promise, Timeout</code></pre><h2>Real Life Scenario</h2><p>Handling thousands of concurrent requests in Node.js without multithreading.</p><h2>Deep Dive</h2><p>Understanding the Call Stack, Callback Queue, Microtask Queue, and how the Event Loop orchestrates them.</p><h2>Pros</h2><ul><li>Non-blocking execution.</li><li>Efficient resource usage.</li></ul><h2>Cons</h2><ul><li>CPU-intensive tasks can block the loop.</li></ul><h2>When to Use</h2><ul><li>I/O heavy operations</li><li>API requests</li><li>Timers</li></ul><h2>Tips</h2><ul><li>Don't block the event loop with heavy calculations.</li></ul><h2>Common Pitfalls</h2><ul><li>Assuming \`setTimeout(..., 0)\` executes immediately.</li></ul>`,
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
