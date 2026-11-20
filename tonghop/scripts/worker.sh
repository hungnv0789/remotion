#!/usr/bin/env bash
# Foreground worker. background.sh supplies stdout/stderr redirection and PID files.
set -Eeuo pipefail
TASK_WORKER_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source "$TASK_WORKER_DIR/env.sh"
job="${1:?Missing job name}"
exit_file="${2:?Missing exit-status file}"
on_exit() {
  local result=$?
  printf '%s\n' "$result" > "$exit_file"
  printf '[%s] Finished %s; exit=%s\n' "$(date -Is)" "$job" "$result"
  exit "$result"
}
trap on_exit EXIT
printf '%s\n' "$$" > "${exit_file%.exit}.started"
run() {
  printf '+'
  printf ' %q' "$@"
  printf '\n'
  "$@"
}
printf '[%s] Starting %s in %s\n' "$(date -Is)" "$job" "$TASK_PROJECT_DIR"
case "$job" in
  render)
    run npm run render
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/verify-media.py"
    ;;
  previews)
    run npm run previews
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/create_contact_sheet.py"
    ;;
  checks)
    run npm run typecheck
    run npm test
    ;;
  verify)
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/verify-media.py"
    ;;
  audit)
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/audit_artifacts.py"
    ;;
  package)
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/package-source.py"
    ;;
  transcribe)
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/transcribe.py" --model "$TRANSCRIBE_MODEL"
    printf 'Review src/data/transcription.json and script.json before the prepare job.\n'
    ;;
  prepare)
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/prepare-audio.py"
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/calibrate-mix.py" --target-db -24 --headroom-db 6
    run npm run captions
    ;;
  contact-sheet)
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/create_contact_sheet.py"
    ;;
  review-year)
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/review_audio.py" --start 19 --duration 8 --model "$TRANSCRIBE_MODEL"
    ;;
  review-tail)
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/review_audio.py" --start 77 --duration 6.2 --model "$TRANSCRIBE_MODEL" --vad
    ;;
  *)
    printf 'Unknown job: %s\n' "$job" >&2
    exit 2
    ;;
esac
