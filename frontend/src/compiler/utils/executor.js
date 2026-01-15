export const executeCode = async (code) => {
  const logs = [];
  const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
  };

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
    const wrappedCode = `(async () => {
            try {
                ${code}
            } catch (err) {
                console.error(err.toString());
            }
        })()`;

    await eval(wrappedCode);
  } catch (err) {
    logs.push({ type: "error", content: err.toString() });
  } finally {
    console.log = originalConsole.log;
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
  }

  return logs;
};
