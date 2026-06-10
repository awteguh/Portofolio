import type { Skill } from "./types"

export const skills: Skill[] = [
  {
    category: "IT Support",
    icon: "🛡️",
    items: [
      "Windows Server",
      "Active Directory",
      "Networking & TCP/IP",
      "Troubleshooting",
      "Help Desk Management",
      "Hardware Maintenance",
    ],
  },
  {
    category: "SOC Analyst",
    icon: "🔒",
    items: [
      "SIEM (Splunk / Wazuh)",
      "Incident Response",
      "Threat Analysis",
      "Log Monitoring",
      "Vulnerability Assessment",
      "Firewall Management",
    ],
  },
  {
    category: "DevOps",
    icon: "⚙️",
    items: [
      "Docker & Kubernetes",
      "CI/CD (Jenkins / GitHub Actions)",
      "Linux Administration",
      "Cloud (AWS / GCP)",
      "Terraform / Ansible",
      "Monitoring (Grafana / Prometheus)",
    ],
  },
]
