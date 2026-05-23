# Development Notes

- **Frontend:** React + Vite, routing via react-router-dom
- **Global state:** `src/context/Store.jsx` (cart, wishlist, simulated pricing)
- **Terraform:** `terraform/` contains S3 and CloudFront setup and IAM for CI
- **CI:** `.github/workflows` has Terraform workflow and Build+Deploy workflow (syncs dist to S3)

## Priority next steps
- Replace placeholder images with optimized WebP assets uploaded to S3 + CloudFront
- Implement server-side order API & payment integration
- Integrate Google Places for address autocomplete and pincode verification
- Run accessibility audits and fix items
