# Contributing to @kaimeleon/temporal-sdk

## SDK Update and Publishing Process

When making changes to the SDK that need to be used in the kai-temporal project, follow these steps:

### 1. Make Your Changes

Make the necessary code changes to the SDK files in the `src/` directory.

### 2. Commit Your Changes

Before versioning, ensure all changes are committed:

```bash
git add .
git commit -m "Your commit message"
```

### 3. Update Version

Use npm to patch the version (increments the patch number):

```bash
npm version patch
```

For minor or major version updates:
```bash
npm version minor  # 1.2.7 -> 1.3.0
npm version major  # 1.2.7 -> 2.0.0
```

### 4. Build the SDK

Build the TypeScript files to JavaScript:

```bash
npm run build
```

### 5. Publish to npm

Publish the new version to npm:

```bash
npm publish
```

This will automatically:
- Run `npm run clean` to remove old build files
- Run `npm run build` to create fresh build files
- Publish to npm registry

### 6. Update kai-temporal Project

In the kai-temporal project directory:

1. Update the SDK version in package.json:
   ```bash
   cd ../kai-temporal
   ```

2. Edit package.json to update the version:
   ```json
   "@kaimeleon/temporal-sdk": "^1.2.8",
   ```

3. Install the updated package:
   ```bash
   npm install
   ```

### Quick Command Summary

From the kai-temporal-sdk directory:
```bash
# 1. Make and commit your changes
git add .
git commit -m "Update todo interfaces"

# 2. Version, build, and publish
npm version patch
npm run build
npm publish

# 3. Update kai-temporal
cd ../kai-temporal
# Edit package.json with new version
npm install
```

### Important Notes

- Always commit changes before running `npm version` (it requires a clean git working directory)
- The SDK follows semantic versioning (MAJOR.MINOR.PATCH)
- The `prepublishOnly` script automatically cleans and rebuilds before publishing
- Make sure you're logged into npm (`npm login`) before publishing