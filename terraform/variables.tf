variable "aws_region" {
  description = "AWS region to create resources in"
  type        = string
  default     = "ap-south-1"
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket to create (must be globally unique)"
  type        = string
}

variable "environment" {
  description = "Deployment environment label"
  type        = string
  default     = "dev"
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN for CloudFront (optional). If not provided, CloudFront default cert is used."
  type        = string
  default     = ""
}
