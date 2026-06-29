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
      "Membangun dan mengimplementasikan pipeline CI/CD otomatis menggunakan Harness AI — mencakup build, test, dan deployment dengan AI-assisted pipeline intelligence untuk deteksi failure dan optimasi otomatis. Didukung GitHub Actions sebagai trigger dengan multi-environment support (dev, staging, production).",
    tags: ["Harness AI", "GitHub Actions", "Docker", "CI/CD"],
    url: "https://github.com/awteguh/cicd-pipeline",
  },
  {
    title: "SIEM Integration",
    description:
      "Menerapkan sistem SIEM menggunakan Wazuh untuk memantau endpoint, mendeteksi ancaman keamanan, dan menganalisis log secara real-time.",
    tags: ["Wazuh", "Security"],
  },
  {
    title: "Infrastructure as Code",
    description:
      "Provisioning infrastruktur cloud AWS menggunakan Terraform dengan modular architecture dan state management.",
    tags: ["Terraform", "AWS", "Ansible", "Linux"],
    url: "https://github.com/awteguh/iac-terraform",
  },
]
