const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const Theory = require("../models/Theory");
const connectDB = require("../config/db");

const migrate = async () => {
  try {
    await connectDB();
    console.log("Connected to DB...");

    const theories = await Theory.find({});
    console.log(`Found ${theories.length} theories to check.`);

    for (const t of theories) {
      let needsUpdate = false;
      let migrationSource = null;

      // Check if we have legacy theory data
      if (t.theory && (t.theory.overview || t.theory.definition)) {
        migrationSource = t.theory;
      }

      // Only migrate if richContent is empty or we want to force overwrite (we won't force, to preserve edits)
      // But user said "remove legacy", so we must ensure data is moved.
      // If richContent exists, we assume it's already good or edited.
      // If richContent is empty, we MUST migrate.
      if (!t.richContent && migrationSource) {
        console.log(`Migrating matched theory: ${t.title}`);
        let html = "";
        const src = migrationSource;

        if (src.overview) html += `<h2>Overview</h2><p>${src.overview}</p>`;
        if (src.definition)
          html += `<h2>Definition</h2><p>${src.definition}</p>`;
        if (src.syntax)
          html += `<h2>Syntax</h2><pre><code class="language-javascript">${src.syntax}</code></pre>`;
        if (src.realLifeScenario)
          html += `<h2>Real Life Scenario</h2><p>${src.realLifeScenario}</p>`;
        if (src.deepDive) html += `<h2>Deep Dive</h2><p>${src.deepDive}</p>`;

        if (src.pros && src.pros.length > 0) {
          html += `<h2>Pros</h2><ul>${src.pros.map((p) => `<li>${p}</li>`).join("")}</ul>`;
        }
        if (src.cons && src.cons.length > 0) {
          html += `<h2>Cons</h2><ul>${src.cons.map((c) => `<li>${c}</li>`).join("")}</ul>`;
        }
        if (src.whenToUse && src.whenToUse.length > 0) {
          html += `<h2>When to Use</h2><ul>${src.whenToUse.map((i) => `<li>${i}</li>`).join("")}</ul>`;
        }
        if (src.tips && src.tips.length > 0) {
          html += `<h2>Tips</h2><ul>${src.tips.map((i) => `<li>${i}</li>`).join("")}</ul>`;
        }
        if (src.commonPitfalls && src.commonPitfalls.length > 0) {
          html += `<h2>Common Pitfalls</h2><ul>${src.commonPitfalls.map((i) => `<li>${i}</li>`).join("")}</ul>`;
        }

        t.richContent = html;
        needsUpdate = true;
      }

      // Always unset theory field if it exists
      if (t.theory !== undefined) {
        t.theory = undefined;
        needsUpdate = true;
        console.log(`Marking 'theory' field for removal on: ${t.title}`);
      }

      if (needsUpdate) {
        await t.save();
        // Since Mongoose might not unset undefined fields without strict Schema option or direct update
        // let's do a direct update to be sure.
        await Theory.updateOne(
          { _id: t._id },
          { $unset: { theory: 1 }, $set: { richContent: t.richContent } },
        );
        console.log(`Updated and cleaned: ${t.title}`);
      }
    }

    console.log("Migration complete.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

migrate();
