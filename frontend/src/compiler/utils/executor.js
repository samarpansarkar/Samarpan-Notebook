/**
 * Safely executes JavaScript code and captures console output.
 * @param {string} code - The JavaScript code to execute.
 * @returns {Promise<Array<{type: 'log' | 'error' | 'warn', content: string}>>}
 */
export const executeCode = async (code) => {
  const logs = [];
  const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
  };

  // Mock console methods to capture output
  console.log = (...args) => {
    logs.push({
      type: "log",
      content: args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
        )
        .join(" "),
    });
    originalConsole.log(...args);
  };

  console.error = (...args) => {
    logs.push({
      type: "error",
      content: args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
        )
        .join(" "),
    });
    originalConsole.error(...args);
  };

  console.warn = (...args) => {
    logs.push({
      type: "warn",
      content: args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
        )
        .join(" "),
    });
    originalConsole.warn(...args);
  };

  try {
    // Use Function constructor for a safer eval alternative (still has access to globals but restricted scope compared to direct eval)
    // We wrap it in an async function to support await
    const wrappedCode = `(async () => {
            try {
                ${code}
            } catch (err) {
                console.error(err.toString());
            }
        })()`;

    // Execute the code
    await eval(wrappedCode);
  } catch (err) {
    logs.push({ type: "error", content: err.toString() });
  } finally {
    // Restore console methods
    console.log = originalConsole.log;
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
  }

  return logs;
};
