#!/usr/bin/env bash
set -euo pipefail

# Usage: S3_BUCKET=my-bucket DIST_ID=E123... ./scripts/s3_upload.sh
BUCKET=${S3_BUCKET:-""}
DIST_ID=${DIST_ID:-""}

if [ -z "$BUCKET" ]; then
  echo "Please set S3_BUCKET environment variable to the target bucket name"
  exit 1
fi

echo "Syncing ./dist to s3://$BUCKET/ ..."
aws s3 sync ./dist s3://$BUCKET --delete --acl private --cache-control "public, max-age=31536000"

if [ -n "$DIST_ID" ]; then
  echo "Creating CloudFront invalidation for $DIST_ID"
  aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"
fi

echo "Upload complete."
