terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.0"
    }
  }
  required_version = ">= 1.1.0"
}

provider "aws" {
  region = var.aws_region
}

##########################
# S3 bucket for product images
##########################
resource "aws_s3_bucket" "images" {
  bucket = var.s3_bucket_name
  acl    = "private"

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

resource "aws_s3_bucket_public_access_block" "images_block" {
  bucket                  = aws_s3_bucket.images.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

##########################
# CloudFront Origin Access Identity (OAI)
##########################
resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for Kesav Spice Store images"
}

##########################
# S3 bucket policy to allow CloudFront OAI to GetObject
##########################
data "aws_iam_policy_document" "s3_policy" {
  statement {
    sid = "AllowCloudFrontServicePrincipalReadOnly"
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.oai.iam_arn]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.images.arn}/*"]
  }
}

resource "aws_s3_bucket_policy" "images_policy" {
  bucket = aws_s3_bucket.images.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

##########################
# CloudFront distribution
##########################
resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Kesav Spice Store CDN for product images"
  default_root_object = "index.html"

  origin {
    domain_name = aws_s3_bucket.images.bucket_regional_domain_name
    origin_id   = "s3-images-origin"
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-images-origin"
    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
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
# IAM user & policy for CI to upload assets
##########################
resource "aws_iam_user" "ci_uploader" {
  name = "kesav-ci-uploader"
}

data "aws_iam_policy_document" "ci_s3_policy_doc" {
  statement {
    sid = "AllowS3AccessToImagesPrefix"
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl",
      "s3:GetObject",
      "s3:ListBucket",
      "s3:GetObjectAcl"
    ]
    resources = [
      aws_s3_bucket.images.arn,
      "${aws_s3_bucket.images.arn}/*"
    ]
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
  description = "CI IAM access key id (store securely in GitHub Secrets)"
}

output "ci_secret_access_key" {
  value       = aws_iam_access_key.ci_access_key.secret
  description = "CI IAM secret access key (store securely in GitHub Secrets)"
  sensitive   = true
}
