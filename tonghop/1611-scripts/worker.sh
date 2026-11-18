#!/usr/bin/env bash
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
run() { printf '+'; printf ' %q' "$@"; printf '\n'; "$@"; }
require_node_modules() {
  if [[ ! -f node_modules/remotion/package.json ]]; then
    printf 'Project dependencies are unavailable. Run the setup job (npm ci) first.\n' >&2
    return 2
  fi
}
align_audio() {
  if [[ ! -f out/tts-cache/plan.json ]]; then
    printf 'Missing TTS chapter plan. Run tts before align; source ZIP excludes out/tts-cache.\n' >&2
    return 2
  fi
  run "$ASR_PYTHON_BIN" "$TASK_SCRIPTS_DIR/align-audio.py" --model "$ALIGN_MODEL"
}
create_speech() {
  run "$TTS_PYTHON_BIN" "$TASK_SCRIPTS_DIR/generate-speech.py" --voice "$VOICE_NAME" --tempo "$TTS_TEMPO" --threads "$TTS_THREADS"
}
calibrate() { run "$ASR_PYTHON_BIN" "$TASK_SCRIPTS_DIR/calibrate-mix.py" --target-db -22 --headroom-db 6; }
audio_pipeline() {
  require_node_modules
  create_speech
  align_audio
  calibrate
  run npm run captions
}
printf '[%s] Starting %s in %s\n' "$(date -Is)" "$job" "$TASK_PROJECT_DIR"
case "$job" in
  setup)
    if [[ -L node_modules && ! -e node_modules ]]; then
      printf 'Removing only the dangling node_modules symbolic link before npm ci.\n'
      run rm -- node_modules
    fi
    run npm ci --no-audit --no-fund
    ;;
  environment)
    run "$TTS_PYTHON_BIN" "$TASK_SCRIPTS_DIR/check_environment.py"
    run "$ASR_PYTHON_BIN" "$TASK_SCRIPTS_DIR/check_environment.py"
    ;;
  tts) create_speech ;;
  align) align_audio ;;
  calibrate) calibrate ;;
  audio) audio_pipeline ;;
  captions) require_node_modules; run npm run captions ;;
  checks) require_node_modules; run npm run typecheck; run npm test ;;
  previews)
    require_node_modules
    run npm run previews
    run "$ASR_PYTHON_BIN" "$TASK_SCRIPTS_DIR/create_contact_sheet.py"
    ;;
  render)
    require_node_modules
    run npm run render
    run "$ASR_PYTHON_BIN" "$TASK_SCRIPTS_DIR/verify-media.py"
    ;;
  full)
    audio_pipeline
    run npm run typecheck
    run npm test
    run npm run render
    run "$ASR_PYTHON_BIN" "$TASK_SCRIPTS_DIR/verify-media.py"
    ;;
  verify) run "$ASR_PYTHON_BIN" "$TASK_SCRIPTS_DIR/verify-media.py" ;;
  audit) run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/audit_artifacts.py" ;;
  package)
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/package-source.py"
    run "$PYTHON_BIN" "$TASK_SCRIPTS_DIR/audit_artifacts.py" --archive "$TASK_PROJECT_DIR/out/1611-with-summary-source.zip"
    ;;
  contact-sheet) run "$ASR_PYTHON_BIN" "$TASK_SCRIPTS_DIR/create_contact_sheet.py" ;;
  *) printf 'Unknown job: %s\n' "$job" >&2; exit 2 ;;
esac
