---
title: Storybook cases prompt
date: 2026-05-02
description: Workflow for branching, agents, and stories per Angular component—with the Storybook mark by the title.
tags:
  - Angular
  - React
  - Storybook
titleLogo: https://cdn.jsdelivr.net/gh/storybookjs/brand@master/icon/icon-storybook-default.svg
---

## Creating cases

1. In your **front-end folder**, create a branch named `storybook-YYYY-MM-DD` (use today’s date) so you always know when Storybook was last updated.

2. **For each Angular component**, start an agent in a **new context** and either rewrite existing story files or create them if they are missing. Include **multiple cases per component** (default state, variants, edge cases—whatever the component needs).

3. When you are finished, **commit and push**.

This pattern works in Angular-first repos; the same idea applies if you also maintain **React** components with Storybook—one focused agent pass per component (or small group) keeps context clean and stories consistent.
