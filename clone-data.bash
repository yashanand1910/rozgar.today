# Script to clone production data for the backend emulator
# Make sure you have Google Cloud SDK installed and you're logged in on gcloud and firebase

# Stop following command execution if command before failed
set -e

# Remove previous bucket if exists
delete_previous_version_if_exists() {
  # We either delete local folder and bucket object or just a bucket
  rm -r ./data-clone &&
  gsutil -m rm -r gs://rozgar-today-dev/data-clone ||
  gsutil -m rm -r gs://rozgar-today-dev/data-clone
}

export_production_firebase_to_emulator() {
  # Export production firebase to emulator bucket
  gcloud firestore export gs://rozgar-today-dev/data-clone

  # Copy to local folder
  gsutil -m cp -r gs://rozgar-today-dev/data-clone .
}

# Run bash functions, either delete previous bucket and local folder if exists for update or just export clean way
delete_previous_version_if_exists && export_production_firebase_to_emulator ||
export_production_firebase_to_emulator
