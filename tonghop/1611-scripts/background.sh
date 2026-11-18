#!/usr/bin/env bash
# Start a detached job and save its log, PID and final exit status.
set -Eeuo pipefail
job="${1:---help}"
case "$job" in
  --help|-h)
    cat <<'HELP'
Usage: bash tonghop/1611-scripts/background.sh JOB
Jobs: setup, environment, tts, align, calibrate, audio, captions, checks,
      previews, render, full, verify, audit, package, contact-sheet
Output: out/tonghop/JOB-TIMESTAMP-UNIQUE.log, .pid and .exit
The command returns immediately. Exit file 0 means success; missing .exit means
no completion has been reported yet. Each launcher prints the exact file paths.
Environment: NODE_BIN_DIR, TTS_PYTHON_BIN, ASR_PYTHON_BIN, PYTHON_BIN,
             ALIGN_MODEL, VOICE_NAME, TTS_TEMPO, TTS_THREADS,
             REMOTION_BROWSER_EXECUTABLE, FFMPEG_BINARY, FFPROBE_BINARY.
HELP
    exit 0
    ;;
  setup|environment|tts|align|calibrate|audio|captions|checks|previews|render|full|verify|audit|package|contact-sheet) ;;
  *) printf 'Unknown job: %s. Use --help.\n' "$job" >&2; exit 2 ;;
esac
TASK_LAUNCHER_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source "$TASK_LAUNCHER_DIR/env.sh"
log_dir="$TASK_PROJECT_DIR/out/tonghop"
mkdir -p -- "$log_dir"
log_file="$(mktemp "$log_dir/${job}-$(date -u +%Y%m%dT%H%M%SZ)-XXXXXX.log")"
base="${log_file%.log}"
# setsid separates the worker from a short-lived launching shell on Linux.
if command -v setsid >/dev/null 2>&1; then
  nohup setsid bash "$TASK_LAUNCHER_DIR/worker.sh" "$job" "$base.exit" > "$log_file" 2>&1 < /dev/null &
else
  nohup bash "$TASK_LAUNCHER_DIR/worker.sh" "$job" "$base.exit" > "$log_file" 2>&1 < /dev/null &
fi
job_pid=$!
printf '%s\n' "$job_pid" > "$base.pid"
# Wait only for startup acknowledgement, never for the render to finish.
for ((attempt=0; attempt<100; attempt++)); do
  if [[ -f "$base.started" || -f "$base.exit" ]]; then break; fi
  if ! kill -0 "$job_pid" 2>/dev/null; then break; fi
  sleep 0.05
done
if [[ ! -f "$base.started" && ! -f "$base.exit" ]]; then
  printf 'Worker did not acknowledge startup. Inspect: %s\n' "$log_file" >&2
  exit 1
fi
printf 'Job: %s\nPID: %s\nLog: %s\nPID file: %s\nExit file: %s\n' "$job" "$job_pid" "$log_file" "$base.pid" "$base.exit"
printf 'Follow: tail -f %q\n' "$log_file"
