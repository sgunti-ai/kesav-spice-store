# Kesav Spice Store - React + Vite Project

## Structure
- `terraform/` : Terraform infra for S3 + CloudFront + IAM
- `src/` : React app (main, components, pages, styles)
- `.github/workflows/` : CI workflows (terraform + build)
- `scripts/` : helper scripts (upload to S3)
- `package.json`, `index.html` - standard app bootstrap

## Quick start (local)
1. Install Node >=18 and npm.
2. `npm install`
3. `npm run dev`
4. Open http://localhost:5173

## Terraform (local)
1. `cd terraform`
2. `terraform init`
3. `terraform plan -var-file="terraform.tfvars"`
4. `terraform apply -var-file="terraform.tfvars"`

## Important
- Replace placeholder S3 bucket name in `terraform/terraform.tfvars` with a globally unique bucket name.
- Configure GitHub Actions secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME`, `CLOUDFRONT_DISTRIBUTION_ID`.
- Replace placeholder images with your real assets (upload to S3 or update image URLs).
