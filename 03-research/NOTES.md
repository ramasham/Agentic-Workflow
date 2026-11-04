# Part 3 — Structured Web Research (Firecrawl MCP)

## 1. Objective

The goal was to use Firecrawl MCP with OpenCode to conduct structured web research and verify the accuracy of extracted information.

**Research question:** How can developers build accessible and responsive personal portfolio websites?

## 2. Environment

- AI agent: OpenCode
- MCP server: Firecrawl MCP
- Research sources: MDN Web Docs
- Extraction format: Markdown

## 3. Tools Used

**`firecrawl_search`**

Used to discover relevant webpages about responsive web design, semantic HTML, media queries, accessible forms, and accessibility testing.

**`firecrawl_scrape`**

Used to extract content from specific URLs, including Markdown and webpage metadata.

## 4. Research Process

1. Connected Firecrawl MCP to OpenCode.
2. Used `firecrawl_search` to find relevant documentation.
3. Selected five articles related to the research question.
4. Used `firecrawl_scrape` to extract their content.
5. Saved the raw MCP responses in `03-research/raw/`.
6. Created `research.md` with source information and research findings.
7. Manually compared the extracted information with the original webpages.

## 5. Problems Encountered

**Saving raw responses:** Firecrawl returned the extracted content to OpenCode but did not automatically save it to local files.

**Solution:** Exported the OpenCode session and used Python to extract the original Firecrawl tool responses into JSON files.

**Extraction artifacts:** Some extracted Markdown included navigation links, promotional content, and formatting artifacts such as `htmlCopy` and `cssCopy`.

These were documented in the extraction audits.

## 6. Verification

I manually compared the five extracted sources with their original MDN webpages.

The sections I checked matched the original content. I recorded the extraction artifacts and verification observations in `research.md`.

## 7. Firecrawl MCP vs. Playwright MCP

Firecrawl MCP is suitable for discovering webpages and extracting structured content for research.

Playwright MCP is suitable for interacting with webpages through a real browser, including navigation, clicking elements, and inspecting dynamic content.

Firecrawl is generally more convenient for extracting article text, while Playwright provides greater control over browser interactions.

## 8. What I Learned

This exercise helped me understand how MCP servers extend an AI agent's capabilities and how web information can be collected and structured automatically.

I also learned why AI-generated research must be verified against original sources and why preserving raw tool responses is important for reproducibility and debugging.
