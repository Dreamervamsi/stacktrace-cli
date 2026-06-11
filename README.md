# tracer-ai

`tracer-ai` is a powerful, AI-driven diagnostic tool that turns cryptic, complex Node.js stack traces into human-readable, actionable debugging insights.

When your application crashes unexpectedly due to an unhandled exception, `tracer-ai` intercepts the error, sends the stack trace to an advanced LLM (via Hugging Face), and generates a concise report explaining the root cause and providing a suggested fix.

## Features

* **Automatic Interception:** Seamlessly hooks into `uncaughtException` to catch crashes before they disappear.
* **AI-Powered Diagnostics:** Leverages state-of-the-art models (like Llama-3) to interpret deep, recursive, or complex runtime errors.
* **Readable Reports:** Automatically converts AI-generated markdown analysis into a clean text file (`stacktrace-fix.md`) in your project root for quick reference.
* **Developer Friendly:** Designed to be lightweight and easy to integrate into any Node.js project.

---

## ⚠️ Important: Hugging Face Token Required

This package uses the [Hugging Face Inference API](https://huggingface.co/inference-api) to perform error analysis. **You must have a valid Hugging Face API token** to use this tool.

### Setup Instructions

1. **Get your Token:**
   - Create a free account at [Hugging Face](https://huggingface.co/).
   - Go to **Settings > Access Tokens** and create a new token with "Read" access.

2. **Configure your Environment:**
   Add your token to a `.env` file in the root of your project:

   ```bash
   HF_TOKEN=your_hf_access_token_here
   ```

---

## Installation

### Via npm

```bash
npm install tracer-ai
```
---

## Usage

### 1. Set Up Your Hugging Face Token

Create a `.env` file in your project root:

```bash
HF_TOKEN=your_hf_access_token_here
```

### 2. Import in Your Application

Add the following import **at the very beginning** of your main Node.js application file (before any other code):

```javascript
import 'tracer-ai';
```

For CommonJS:

```javascript
require('tracer-ai');
```

### 3. That's It!

The tool will automatically intercept any uncaught exceptions. When an error occurs:

1. **Error Detection:** The app catches the uncaught exception
2. **AI Analysis:** The stack trace is sent to Hugging Face's Llama-3 model
3. **Report Generation:** An `error-handler.md` file is created in your project root with:
   - Exact error description
   - Root cause analysis
   - Suggested fix

### Example

```javascript
// app.js
import 'tracer-ai'; // Must be first!
import dotenv from 'dotenv';

dotenv.config();

// Your application code
function buggyFunction() {
    const data = undefined;
    return data.access; // This will trigger the error handler
}

buggyFunction();
```

Run your app:

```bash
node app.js
```

When the error occurs, check the generated `error-handler.md` for the AI-powered analysis.

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `HF_TOKEN` | Your Hugging Face API token | ✅ Yes |

---

## Example Output

When an error is caught, you'll see:

```
An unexpected error occurred. Analyzing with AI...
--- AI Analysis ---
💡 Suggested Fix is written in error-handler.md file
```

The generated `error-handler.md` will contain a detailed analysis of the error and how to fix it
