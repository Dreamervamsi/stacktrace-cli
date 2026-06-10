# stacktrace-ai

`stacktrace-ai` is a powerful, AI-driven diagnostic tool that turns cryptic, complex Node.js stack traces into human-readable, actionable debugging insights.

When your application crashes unexpectedly due to an unhandled exception, `stacktrace-ai` intercepts the error, sends the stack trace to an advanced LLM (via Hugging Face), and generates a concise report explaining the root cause and providing a suggested fix.

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