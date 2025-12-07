# Copilot Instructions for Captain's Log

## Project Overview
**Captain's Log** is a React-based web application for managing personal captain's log entries for Star Trek characters. It's built with React 18, React Router v6, Tailwind CSS, and uses localStorage for persistence.

**Key Concept**: The app groups logs by captain (multiple captains with different ships) and provides filtering, searching, and editing capabilities.

## Architecture

### Data Structure (Core Pattern)
Logs are organized hierarchically in `localStorage` under the `captainsLogs` key:

```javascript
[
  {
    captainName: "Jean-Luc Picard",
    captainImage: "JeanLuc_Picard.jpg",
    shipName: "USS Enterprise",
    shipImage: "USS_Enterprise.webp",
    lastCrisisDate: "2016-03-05",  // Used for "days since" calculations
    logs: [
      {
        id: "JeanLuc_Picard_1",
        location: "Archanis Sector",
        logTitle: "Diplomatic Mission",
        logContent: "Full text...",
        date: "2075-08-17",
        mistakesWereMadeToday: false,
        daysSinceLastCrisis: 21714
      },
      // ... more logs
    ]
  },
  // ... more captains
]
```

### Key Modules

- **`src/model/logStorage.js`**: Core CRUD operations for localStorage. All data mutations go through this module. Includes `getLogs()`, `saveLogs()`, `initLogs()`.
- **`src/model/logs.json`**: Seed data (~4600 lines) loaded on first run. Only loaded once into localStorage.
- **`src/assets/index.js`**: Image mappings for captains and ships. Used by `logStorage.js` for sanitization.
- **`src/components/`**: React components. Modal-driven UX (AddNewLogModal, EditLogModal, LogDetail).

### Important Workflows

1. **Initialization**: `initLogs()` called in `src/index.jsx` creates localStorage on first run, or skips if it exists.
2. **Data Refresh**: Components use `getLogs()` and call `refreshLogs()` to re-render after mutations.
3. **Image Sanitization**: `logStorage.js:sanitizeLogs()` ensures all captain/ship images are valid, using fallback placeholders.

## Code Patterns & Conventions

### State Management
- Use `useState` for UI state (modals, filters, sort options).
- Use `useEffect` with empty deps on component mount to `setLogs(getLogs())`.
- Call `refreshLogs()` after mutations to re-sync localStorage changes to React state.

### localStorage Operations
- Never mutate the returned object directly—use `saveLogs(newArray)` to persist.
- Always call `sanitizeLogs()` after loading to ensure images exist in asset mapping.
- ID generation: Use timestamp-based (`Date.now()` cast to string) for new logs.

### Filtering & Search
- Search is case-insensitive across `captainName`, `shipName`, `logTitle`, `logContent`, `location`.
- Apply filters sequentially: search → captain filter → mistakes filter → sort.
- See `LogList.jsx` for the canonical filter implementation.

### Form Validation
- Required fields: `selectedCaptain` and `logTitle` in AddNewLogModal.
- Other fields default to empty or today's date.
- See `AddNewLogModal.jsx:handleSubmit()` for the pattern.

### Component Naming
- Modals: `*Modal.jsx` (AddNewLogModal, EditLogModal)
- Containers: `*List.jsx`, `*Detail.jsx` (LogList, LogDetail)
- Utility Components: Use descriptive names (SearchBar, FilterActions)

## Build & Deployment

- **Scripts**: `npm start`, `npm run build`, `npm test`, `npm run deploy`
- **Styling**: Tailwind CSS with standard utilities (`text-xl`, `bg-white`, `flex`, etc.)
- **CSS Modules**: Custom CSS files exist for modals (e.g., `AddNewLogModal.css`, `Modal.css`)—import alongside JSX.
- **Deploy**: GitHub Pages via `gh-pages` dependency; run `npm run deploy` to publish to branch.

## Testing Notes

- Tests use React Testing Library (see `src/App.test.jsx`).
- Import `setupTests.js` for test configuration.
- Run `npm test` for interactive watch mode.

## Conventions to Follow

- **Captain Names**: Normalize with `.toLowerCase().replace(/\s/g, "_").replace(/-/g, "")` when mapping to images.
- **Date Handling**: Use ISO 8601 format (`YYYY-MM-DD`); calculate days with `Math.floor((newDate - oldDate) / (1000 * 60 * 60 * 24))`.
- **Hooks**: Always call hooks at top level; never inside conditionals.
- **Image Paths**: Stored as import references in `assets/index.js`, not URLs—avoids broken links.

## Common Tasks

**Adding a new log field**: 
1. Update `logs.json` seed data structure.
2. Update AddNewLogModal form.
3. Update EditLogModal form.
4. Update display components (LogDetail, LogList).
5. Test with `npm test`.

**Adding a new captain**:
1. Import image in `assets/index.js`, add to `captainImages` object.
2. Add entry to `logs.json` with at least one log.
3. No code changes needed if image key matches captain name.

**Debugging localStorage**:
- Open DevTools → Application → Local Storage → inspect `captainsLogs` key.
- Call `localStorage.getItem('captainsLogs')` in console and parse as JSON to inspect structure.
