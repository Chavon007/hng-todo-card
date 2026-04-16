# Todo Card — stage 1

An interactive Todo Card built with vanilla HTML, CSS, and JavaScript.

## What Changed from Stage 0

- Edit mode with inline form (title, description, priority, due date)
- Status dropdown (Pending, In Progress, Done)
- Checkbox and status stay in sync
- Priority indicator dot that updates with priority level
- Expand/collapse toggle for long descriptions
- Live countdown that updates every 30 seconds
- Overdue indicator with red styling
- Due date updates when edited

## Design Decisions

- Due date parsed as local time (`T23:59:00`) to avoid timezone issues
- `clearInterval` called before each new interval to prevent stacking
- Priority color applied to badge and dot via shared function

## Known Limitations

- Delete button has no action (no list context in this stage)
- Tags cannot be added or removed
- Data resets on page refresh

## Accessibility

- All form inputs have `<label>` elements
- Expand toggle uses `aria-expanded` and `aria-controls`
- Time remaining uses `aria-live="polite"`
- Focus returns to Edit button after save/cancel

## Live URL

https://hng-todo-card-one.vercel.app/

## Author

Name: Salvation Azuh
GitHub: https://github.com/Chavon007
