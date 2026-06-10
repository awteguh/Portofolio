import type { Project } from "./types"

export const projects: Project[] = [
  {
    title: "Monitoring Dashboard",
    description:
      "Setup stack monitoring menggunakan Grafana dan Prometheus untuk memantau performa server dan aplikasi secara real-time.",
    tags: ["Grafana", "Prometheus", "Docker", "Linux"],
    url: "https://github.com/awteguh/monitoring-dashboard",
  },
  {
    title: "CI/CD Pipeline Automation",
    description:
      "Membangun pipeline otomatis untuk build, test, dan deployment menggunakan GitHub Actions dengan multi-environment support.",
    tags: ["GitHub Actions", "Docker", "Node.js", "AWS"],
    url: "https://github.com/awteguh/cicd-pipeline",
  },
  {
    title: "SIEM Integration",
    description:
      "Integrasi Wazuh SIEM dengan berbagai log source untuk centralized security monitoring dan automated alerting.",
    tags: ["Wazuh", "ELK Stack", "Python", "Security"],
  },
  {
    title: "Infrastructure as Code",
    description:
      "Provisioning infrastruktur cloud AWS menggunakan Terraform dengan modular architecture dan state management.",
    tags: ["Terraform", "AWS", "Ansible", "Linux"],
    url: "https://github.com/awteguh/iac-terraform",
  },
]
