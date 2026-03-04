# Comprehensive UI Quality Assurance (QA) Test Cases

This document serves as a generalized UI/UX checklist that can be applied across any React, Next.js, or modern web project. It has been compiled from historical debugging sessions to proactively catch common visual regressions, accessibility flaws, and responsive layout issues. Always use this checklist during final UI reviews or pre-deployment to ensure quality standards.

## 1. Global Navigation & Accessibility

### 1.1 Mobile Navigation Visibility & Clipping
- **Pre-condition:** Set the viewport to a mobile width (e.g., `< 768px`) using browser DevTools.
- **Action:** Open the mobile menu and scroll down the page.
- **Expected Result:** The mobile navigation bar must maintain the correct `backdrop-blur` or solid background effect. The page content scrolling underneath should not bleed through and clash with navigation text, keeping the menu 100% readable.

### 1.2 Hyperlink Integrity & Anchor Routing
- **Pre-condition:** Open any page acting as a hub for both internal and external links.
- **Action:** Click through a sample of:
  - Header/Footer anchor links (e.g., `href="#services"`).
  - External resource links (e.g., `href="https://github.com..."`).
- **Expected Result:** Internal anchors must smoothly scroll to the correct underlying `id` section without being obstructed by sticky headers. External links must open functional pages (preferably `target="_blank" rel="noopener noreferrer"`).

## 2. Theming & Color Adaptability (Dark/Light Modes)

### 2.1 Text Outline Contrast (Dark Mode)
- **Pre-condition:** Toggle the application's global theme to **Dark Mode**.
- **Action:** Scroll through all dense text sections, specifically looking for headings or paragraph typography.
- **Expected Result:** The text must effectively contrast against dark backgrounds (e.g., using light-gray or off-white). Typography should not blend into the dark layout.

### 2.2 Component & Background Bleed (Light Mode)
- **Pre-condition:** Toggle the application's global theme to **Light Mode**.
- **Action:** Inspect structurally complex regions like grid layouts, feature blocks, and "What We Do" style sections.
- **Expected Result:** All sections must remain visible. Background colors must intelligently adapt from dark to light themes without resulting in "white text on a white background". No section borders or backgrounds should vanish.

### 2.3 Contextual Icon/SVG Inversion
- **Pre-condition:** Test the application while rapidly toggling between **Light Mode** and **Dark Mode**.
- **Action:** Review standalone SVGs, social media icons, and technology logos.
- **Expected Result:** All icons specifically designed as one color (like flat white or black) must invert their fill color dynamically. A solid black logo must flip to white in Dark Mode to remain visible, and vice versa.

## 3. Component Uniformity & Spacing

### 3.1 Card Height & Width Constraints
- **Pre-condition:** Navigate to any section displaying repeated cards in a grid/flex layout (e.g., Blogs, Product Listings, Service Modals).
- **Action:** View a horizontal row containing items with radically different title or paragraph text lengths.
- **Expected Result:** Despite differing content volumes, all cards in a row must share a uniform height (using properties like `h-full` or `flex-1`). Furthermore, common interactive elements like "Read More" buttons should be aligned identically at the bottom of the card (`mt-auto`).

### 3.2 Tooltip & Popover Bounding Boxes
- **Pre-condition:** Navigate to sections employing informative hover states, specifically UI elements near the left or right edges of the screen.
- **Action:** Hover over items positioned at the extreme edges of their parent container.
- **Expected Result:** The tooltips or popovers must fully render. They must not clip outside the viewport window, nor should they be truncated arbitrarily by their parent's `overflow: hidden` bounding box. Popovers should intelligently shift left/right depending on screen boundary limits.

---
4. Responsive Layouts & Breakpoints

### 4.1 Grid-to-Stack Collapse (Tablet/Mobile)
- **Pre-condition:** Open a page with a complex horizontal UI (e.g., 3-column feature grid or side-by-side text/image layout).
- **Action:** Slowly resize the browser window downwards from Desktop (`> 1024px`) past Tablet (`~768px`) to Mobile (`< 640px`).
- **Expected Result:** The multi-column layout must gracefully collapse into a single vertical stack (or a 2-column grid depending on design). Elements must not squish horizontally until text becomes unreadable or images distort. Proper vertical spacing (`gap` or `margin`) must appear when elements stack.

### 4.2 Touch Target Padding (Mobile)
- **Pre-condition:** Open the site on a physical mobile device or mobile emulator.
- **Action:** Attempt to tap densely clustered interactive elements, like footer links, pagination buttons, or inline social icons.
- **Expected Result:** Every tap target must have sufficient padding (minimum 44x44 CSS pixels recommended by WCAG). Tapping one element should never accidentally trigger an adjacent element.

## 5. Interactive States & Feedback

### 5.1 Hover, Active & Disabled States
- **Pre-condition:** Locate primary interactive components like "Submit" buttons, "Read More" links, or Form Inputs.
- **Action:** Hover over the element with a mouse, click and hold (active), or observe it when logic disables it (e.g., empty form).
- **Expected Result:**
  - **Hover:** Should provide clear visual feedback (e.g., subtle scale-up, opacity shift, background color change).
  - **Active:** Should provide tactile feedback (e.g., scale-down, darker shade).
  - **Disabled:** Should look visibly inactive (reduced opacity, grayed out) and change the cursor to `not-allowed`.

### 5.2 Keyboard Focus Management (A11y)
- **Pre-condition:** Load any main page without clicking on it.
- **Action:** Press the `Tab` key repeatedly to navigate through the entire page.
- **Expected Result:** An obvious visual focus indicator (like a high-contrast ring) must highlight the currently focused interactive element. The focus order must be logical (top-to-bottom, left-to-right) and no interactive element should be skipped. Hidden elements (like off-screen mobile menus) should not receive focus.

### 5.3 Loading Skeletons & Spinners
- **Pre-condition:** Trigger an action requiring network latency (e.g., submitting a form, loading a new list of blogs).
- **Action:** Observe the UI for the duration of the network request.
- **Expected Result:** The user must instantly receive visual feedback that something is happening via a localized loading spinner or skeleton UI. The UI must not "freeze" indefinitely with no context.

## 6. Forms & Input Handling

### 6.1 Real-time & Submission Validation
- **Pre-condition:** Navigate to a contact or lead generation form.
- **Action:** 
  1. Click inside a required field and click outside without typing.
  2. Type invalid data formatting (e.g., `"user@.com"` for email) and hit Submit.
- **Expected Result:** The form must catch the errors without refreshing the page. Inline error messages must appear directly below or adjacent to the offending input field in a highly visible color (e.g., Red). The input border should change to indicate the error state.

## 7. Performance & Media 

### 7.1 Cumulative Layout Shift (CLS) on Image Load
- **Pre-condition:** Throttle the network speed to "Slow 3G" in DevTools.
- **Action:** Hard refresh a media-heavy page (e.g., Case Studies or Blogs).
- **Expected Result:** The page layout must not "jump" vertically as images finally render. Space for images must be pre-allocated using aspect ratios or explicit width/height attributes so text does not shift unexpectedly. Image layout shifts disrupt reading and cause accidental clicks.

--- 

> **Automation & AI Usage Note:** 
> When running automated test pipelines (e.g., playwright/cypress) or instructing an AI Agent using scripts like `ux_audit.py`, provide this document to them explicitly. It dictates the exact visual regression boundaries they should manually check for cross-theme durability and component geometry.
