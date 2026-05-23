output "s3_bucket_arn" {
  description = "S3 bucket ARN"
  value       = aws_s3_bucket.images.arn
}

output "cloudfront_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.cdn.id
}

output "ci_iam_user" {
  description = "IAM user created for CI uploads"
  value       = aws_iam_user.ci_uploader.name
}
