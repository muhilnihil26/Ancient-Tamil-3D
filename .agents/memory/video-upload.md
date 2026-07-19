---
name: Video upload fix
description: How to handle large video uploads in AdminContext without crashing the browser
---

## Rule
Never use `FileReader.readAsDataURL()` for video files. Use `URL.createObjectURL()` instead.

**Why:** A 100 MB video becomes ~133 MB of base64 text. This exceeds localStorage's 5–10 MB limit and crashes the browser tab. `createObjectURL` creates a lightweight in-memory reference with no base64 encoding.

**How to apply:**
- `uploadTrailer()` in AdminContext calls `URL.createObjectURL(file)` and stores the blob URL in state + a `blobUrls` ref for cleanup
- File-type trailers are marked `isSessionOnly: true` — their blob URLs die on page reload
- localStorage persistence filters out `type === 'file'` trailers; only URL-type trailers survive reload
- Revoke blob URLs in `removeTrailer()` and on component unmount via `blobUrls.current.forEach(URL.revokeObjectURL)`
- Admin UI shows a warning: "Session only — video resets on page refresh. Use URL mode for permanent trailers."
