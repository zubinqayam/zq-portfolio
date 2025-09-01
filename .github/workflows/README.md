# GitHub Actions Workflows

## Syft Supply Chain Verification (`syft-guard.yml`)

This workflow implements multi-layer supply chain security verification for the Anchore Syft binary, following GitHub's recommended artifact attestation practices.

### Features

- **Automated Schedule**: Runs nightly at 2 AM UTC
- **Manual Trigger**: Can be executed on-demand via workflow_dispatch
- **Multi-layer Security Verification**:
  - ✅ Checksum verification against published checksums
  - 🔐 Cosign signature verification with certificate transparency logs  
  - 📋 SLSA provenance verification (soft-fail to avoid blocking)
  - 🏷️ GitHub Artifact Attestation verification
- **Supply Chain Tools**: Automatically installs cosign, slsa-verifier, and uses GitHub CLI
- **Artifact Upload**: Verified Syft binary is uploaded as a workflow artifact for reuse

### Security Benefits

- Verifies authenticity and integrity of Syft binary before use
- Implements defense-in-depth with multiple verification layers
- Provides audit trail of supply chain verification steps
- Follows industry best practices for software supply chain security

### Workflow Steps

1. **Install Security Tools**: Downloads and installs cosign and slsa-verifier
2. **Download Syft**: Fetches the latest Syft release and associated files
3. **Verify Checksums**: Validates file integrity using SHA256 checksums
4. **Verify Signatures**: Checks cosign signatures against certificate transparency logs
5. **SLSA Provenance**: Attempts SLSA provenance verification (soft-fail)
6. **GitHub Attestations**: Verifies GitHub artifact attestations if available
7. **Upload Artifact**: Stores the verified Syft binary for repository use

### Usage

The workflow runs automatically but can be triggered manually:

1. Go to the "Actions" tab in the repository
2. Select "Syft Supply Chain Verification"
3. Click "Run workflow"

### Output

The workflow produces:
- Detailed verification logs
- Verified Syft binary as a downloadable artifact
- Security verification summary with status of each check