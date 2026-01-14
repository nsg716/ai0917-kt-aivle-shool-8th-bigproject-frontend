**Add your own guidelines here**

<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default.
* Ensure all layouts are mobile-friendly, transitioning from sidebar-based desktop views to bottom-nav-based mobile views.
* Refactor code as you go to keep code clean, and use Tailwind CSS utility classes for all styling to maintain consistency with shadcn/ui.
* Follow an 8px grid system for all spacing (padding, margin, gaps).

--------------

# Design system guidelines

* Use a base font-size of 16px for body text to ensure readability on both desktop and mobile.
* Use a border-radius of 4px for buttons and input fields, and 8px for cards and modals.
* All containers should use a 1px solid border (#E5E7EB) instead of drop shadows for a minimalist B2B SaaS aesthetic.
* Use Lucide-react icons with a stroke width of 1.5.
* In mobile view (390px), the sidebar must be hidden and replaced by a 56px height Bottom Navigation Bar.

## Role-Based Identity
The system uses different primary colors based on the user's role. Apply these colors to active menu items, primary buttons, and focus states.

* Admin (관리자): Primary Color #2D3436 (Deep Graphite). Identity: Stability.
* Operator (운영자): Primary Color #0984E3 (Royal Blue). Identity: Trust.
* Author (작가): Primary Color #6C5CE7 (Deep Indigo). Identity: Creativity.

## Navigation

### Desktop Sidebar
* Width: 260px.
* Active state: Background tint of the role's primary color at 10% opacity, with a 4px vertical accent bar on the left.

### Mobile Bottom Navigation
* Maximum of 3 items per role.
* Author (작가): [홈], [원문], [설정집]
* Operator (운영자): [홈], [IP 확장], [트렌드]
* Admin (관리자): [홈], [권한 관리]

## Button
The Button component is a fundamental interactive element designed based on shadcn/ui.

### Usage
Buttons should have clear, action-oriented labels. On mobile, ensure a minimum touch target height of 48px.

### Variants
* Primary Button
  - Purpose: Main action of the page.
  - Visual Style: Solid fill with the role's specific primary color.
* Secondary Button
  - Purpose: Supporting actions.
  - Visual Style: 1px outline in the role's primary color, transparent background.
* Ghost Button
  - Purpose: Least important actions or navigation within cards.
  - Visual Style: Text-only, using the role's primary color on hover.

## Card
* Usage: Use cards to group related AI analysis data or setting bible entries.
* Visual Style: 1px solid border (#E5E7EB), white background, no shadow.
* Mobile Behavior: Tables must collapse into stacked cards for better vertical scrolling.
-->