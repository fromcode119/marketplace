module.exports = {
  async onInit(context) {
    const { logger, api, db, plugins, collections } = context;

    logger.info("Test Plugin Initialized!");
    logger.info(`Config loaded: ${JSON.stringify(context.plugin.config)}`);

    // Listen for config updates
    plugins.on("plugin:test-feature:config_updated", (newConfig) => {
      logger.info(`Config updated dynamically: ${JSON.stringify(newConfig)}`);
    });

    // Register a collection
    collections.register({
      slug: 'notes',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'textarea' },
        { name: 'status', type: 'select', options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' }
        ], defaultValue: 'draft' }
      ],
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'status', 'createdAt']
      }
    });

    // Register second collection
    collections.register({
      slug: 'tasks',
      fields: [
        { name: 'task', type: 'text', required: true },
        { name: 'done', type: 'boolean', defaultValue: false },
        { name: 'dueDate', type: 'date' }
      ],
      admin: {
        useAsTitle: 'task',
        defaultColumns: ['task', 'done', 'dueDate']
      }
    });
    
    // Register route
    api.get("/api/hello", async (req, res) => {
      logger.info("Handling /api/hello request");
      
      const { sql, count } = db;
      let dbStatus = "Unknown";
      let rowCount = 0;
      let rows = [];

      try {
        const tableName = 'test_plugin_data';
        
        // Count data using Framework DB
        const countResult = await db
          .select({ total: count() })
          .from(sql`${sql.identifier(tableName)}`);
          
        rowCount = Number(countResult[0]?.total || 0);
        dbStatus = "Connected";

        // Framework DB query
        const frameworkRowsResult = await db
          .select()
          .from(sql`${sql.identifier(tableName)}`)
          .limit(1);
          
        rows = frameworkRowsResult;
        logger.info(`Framework DB select success: ${JSON.stringify(rows)}`);
      } catch (err) {
        dbStatus = "Error: " + err.message;
        logger.error(`Database error: ${err.message}`);
      }

      res.json({ 
        message: "Hello from Sandbox Plugin!",
        database: {
          status: dbStatus,
          rowCount,
          latestRow: rows[0] || null
        }
      });
    });

    api.get("/api/media-test", async (req, res) => {
      try {
        const dummyBuffer = Buffer.from("Hello Media!");
        const result = await context.storage.upload(dummyBuffer, "test-file.txt");
        res.json({ success: true, ...result });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    api.get("/api/auth-test", async (req, res) => {
      try {
        const token = await context.auth.generateToken({ id: "123", email: "test@example.com", roles: ["admin"] });
        res.json({ token });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    api.get("/api/cache-test", async (req, res) => {
      try {
        const key = "test-key";
        const val = { hello: "world", time: Date.now() };
        await context.cache.set(key, val, 60);
        const cached = await context.cache.get(key);
        res.json({ success: true, cached });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    api.get("/api/email-test", async (req, res) => {
      try {
        const result = await context.email.send({
          to: "test@example.com",
          subject: "Plugin Test Email",
          text: "This is a test email from the test-feature plugin."
        });
        res.json({ success: true, result });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Test Hooks
    plugins.on("system:ready", async () => {
      logger.info("System is ready! Hook received.");
      const { sql, count } = db;
      const tableName = 'test_plugin_data';
      
      try {
        // Create table using Framework DB execute with identifiers
        await db.execute(sql`
          CREATE TABLE IF NOT EXISTS ${sql.identifier(tableName)} (
            id SERIAL PRIMARY KEY, 
            val TEXT, 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        
        // Insert data using Framework DB
        await db.execute(sql`
          INSERT INTO ${sql.identifier(tableName)} (val) 
          VALUES (${'Fired from hook!'})
        `);
        
        // Count data
        const result = await db
          .select({ total: count() })
          .from(sql`${sql.identifier(tableName)}`);

        logger.info(`Found ${result[0]?.total} rows in ${tableName}`);
      } catch (err) {
        logger.error(`Database operation failed: ${err.message}`);
      }
    });

    // Test Database (with capability)
    try {
      const { sql } = db;
      await db.execute(sql`SELECT 1`);
      logger.info("Initial DB Query Successful");
    } catch (e) {
      logger.error(`Initial DB Query Failed: ${e.message}`);
    }

    // Register Translations
    context.i18n.registerTranslations('en', {
      welcome: "Welcome to Test Feature Plugin!",
      itemsCount: "You have {{count}} items in your list."
    });

    // Register Head Injection (Phase 4)
    context.ui.registerHeadInjection({
      tag: 'meta',
      props: {
        name: 'test-plugin-meta',
        content: 'Phase 4 Metadata Injection Works!'
      }
    });

    context.i18n.registerTranslations('bg', {
      welcome: "Добре дошли в тестовия плъгин!",
      itemsCount: "Имате {{count}} елемента в списъка си."
    });

    // Test translation
    logger.info(`Translation test (en): ${context.i18n.translate('test-feature.welcome')}`);
    logger.info(`Translation test (bg): ${context.i18n.translate('test-feature.welcome', {}, 'bg')}`);
    logger.info(`Translation test params: ${context.i18n.translate('test-feature.itemsCount', { count: 5 })}`);
  },
  async onEnable(context) {
    context.plugins.emit("plugin:enabled", { slug: "test-feature" });
  }
};
