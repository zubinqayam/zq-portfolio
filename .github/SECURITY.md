# Security Policy

## Supported Versions

We take security seriously for the ZQ Portfolio project. The following versions are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| develop | :white_check_mark: |

## Reporting a Vulnerability

We appreciate your efforts to responsibly disclose security vulnerabilities. Please report security vulnerabilities by emailing:

**Email:** zubin.qayam@outlook.com

### What to Include

When reporting a vulnerability, please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact of the vulnerability
- Any suggested fixes (if available)

### Response Timeline

- **Initial Response:** Within 48 hours of receiving your report
- **Status Update:** Within 7 days with preliminary assessment
- **Resolution:** Security patches will be prioritized based on severity

## Security Measures

This repository implements the following security measures through ZQTaskmaster governance:

### Automated Security Scanning

- **CodeQL Analysis:** Weekly automated code security analysis
- **Secret Scanning:** Daily Gitleaks scans to prevent credential exposure
- **Dependency Scanning:** Automated vulnerability detection via Dependabot
- **SBOM Generation:** Software Bill of Materials for supply chain transparency

### Access Control

- **Code Ownership:** All changes require approval from designated code owners
- **Branch Protection:** Main branch protected with required reviews
- **Workflow Security:** GitHub Actions workflows secured with minimal permissions

### Governance

- **ZQTaskmaster Orchestrator:** Governance workflow with approval gates
- **Label Management:** Standardized labeling for security issues
- **Approval Gates:** Confirm→Confirm2 gate logic for sensitive operations

## Security Best Practices

### For Contributors

1. **Never commit sensitive information** (passwords, API keys, personal data)
2. **Use secure coding practices** following OWASP guidelines
3. **Keep dependencies updated** using Dependabot recommendations
4. **Follow the principle of least privilege** for any access requests

### For Maintainers

1. **Review all security alerts** in the GitHub Security tab
2. **Monitor automated scan results** from CodeQL and Gitleaks
3. **Validate SBOM reports** for supply chain security
4. **Respond promptly** to vulnerability reports

## Compliance

This security policy supports:

- **Healthcare Data Protection:** Following healthcare industry security standards
- **Professional Portfolio Security:** Protecting professional reputation and data
- **Open Source Security:** Maintaining secure development practices

## Contact

For security-related questions or concerns:

- **Primary Contact:** Zubin Qayam (zubin.qayam@outlook.com)
- **Professional Profile:** [Google Developer Profile](https://g.dev/zubinqayam)
- **LinkedIn:** [Zubin Qayam](https://linkedin.com/in/zubin-qayam-b22bb7170)

---

*This security policy is part of the ZQTaskmaster CI governance framework and is regularly reviewed and updated.*