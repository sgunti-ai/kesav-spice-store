terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
  required_version = ">= 1.3.0"
}

provider "aws" {
  region = var.aws_region
}

##########################
# S3 bucket for product images
##########################
resource "aws_s3_bucket" "images" {
  bucket = var.s3_bucket_name

  tags = {
    Name        = "kesav-spice-store-images"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_versioning" "images_ver" {
  bucket = aws_s3_bucket.images.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_ownership_controls" "images_ownership" {
  bucket = aws_s3_bucket.images.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "images_block" {
  bucket                  = aws_s3_bucket.images.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

##########################
# CloudFront Origin Access Control (OAC) — replaces deprecated OAI
##########################
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "kesav-spice-store-oac"
  description                       = "OAC for Kesav Spice Store S3"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

##########################
# S3 bucket policy — allow CloudFront OAC
##########################
data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    sid = "AllowCloudFrontServicePrincipalReadOnly"
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.images.arn}/*"]
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cdn.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "images_policy" {
  bucket     = aws_s3_bucket.images.id
  policy     = data.aws_iam_policy_document.s3_policy.json
  depends_on = [aws_s3_bucket_public_access_block.images_block]
}

##########################
# CloudFront distribution
##########################
resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Kesav Spice Store CDN"
  default_root_object = "index.html"

  origin {
    domain_name              = aws_s3_bucket.images.bucket_regional_domain_name
    origin_id                = "s3-images-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "s3-images-origin"
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Environment = var.environment
    Project     = "KesavSpiceStore"
  }
}

##########################
# IAM user & policy for CI uploads
##########################
resource "aws_iam_user" "ci_uploader" {
  name = "kesav-ci-uploader"
}

data "aws_iam_policy_document" "ci_s3_policy_doc" {
  statement {
    sid = "AllowS3AccessToImagesPrefix"
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:ListBucket",
      "s3:DeleteObject"
    ]
    resources = [
      aws_s3_bucket.images.arn,
      "${aws_s3_bucket.images.arn}/*"
    ]
  }
  statement {
    sid       = "AllowCloudfrontInvalidation"
    actions   = ["cloudfront:CreateInvalidation"]
    resources = [aws_cloudfront_distribution.cdn.arn]
  }
}

resource "aws_iam_policy" "ci_s3_policy" {
  name   = "KesavCI_S3ImageAccess"
  policy = data.aws_iam_policy_document.ci_s3_policy_doc.json
}

resource "aws_iam_user_policy_attachment" "ci_attach" {
  user       = aws_iam_user.ci_uploader.name
  policy_arn = aws_iam_policy.ci_s3_policy.arn
}

resource "aws_iam_access_key" "ci_access_key" {
  user = aws_iam_user.ci_uploader.name
}

##########################
# Outputs
##########################
output "s3_bucket_name" {
  description = "S3 bucket name for images"
  value       = aws_s3_bucket.images.bucket
}

output "cloudfront_domain" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.cdn.domain_name
}

output "ci_access_key_id" {
  value       = aws_iam_access_key.ci_access_key.id
  description = "CI IAM access key id — store in GitHub Secrets"
}

output "ci_secret_access_key" {
  value       = aws_iam_access_key.ci_access_key.secret
  description = "CI IAM secret access key — store in GitHub Secrets"
  sensitive   = true
}
